/**
 * One-time migration: seed the new per-media `date` field from each phase's
 * old `lastUpdated`, then remove the orphaned `lastUpdated` values.
 *
 * For every project (published + drafts), for each phase:
 *   - copy phase.lastUpdated onto every media module (image/video) that has no
 *     date yet
 *   - unset phase.lastUpdated
 *
 * Run from the sanity/ folder with a modern Node:
 *   npx sanity exec migrations/backfillMediaDates.js --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

const MEDIA_TYPES = ['imageModule', 'videoModule']

async function run() {
  // perspective: 'raw' so we get published *and* draft documents
  const projects = await client.fetch(
    `*[_type == "project"]{ _id, phases }`,
    {},
    {perspective: 'raw'},
  )

  console.log(`Scanning ${projects.length} project document(s)…`)

  let patched = 0
  let datesSet = 0

  for (const project of projects) {
    const phases = project.phases ?? []
    const patch = client.patch(project._id)
    let changed = false

    for (const phase of phases) {
      const date = phase.lastUpdated

      if (date) {
        for (const mod of phase.modules ?? []) {
          if (MEDIA_TYPES.includes(mod._type) && !mod.date) {
            patch.set({
              [`phases[_key=="${phase._key}"].modules[_key=="${mod._key}"].date`]: date,
            })
            datesSet++
            changed = true
          }
        }
      }

      if (phase.lastUpdated !== undefined) {
        patch.unset([`phases[_key=="${phase._key}"].lastUpdated`])
        changed = true
      }
    }

    if (changed) {
      await patch.commit()
      patched++
      console.log(`  ✓ ${project._id}`)
    }
  }

  console.log(`Done. Patched ${patched} document(s), set ${datesSet} media date(s).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
