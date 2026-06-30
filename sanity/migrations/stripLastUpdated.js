/**
 * Cleanup pass: remove any remaining `lastUpdated` from project phases.
 * Run after backfillMediaDates.js. Unset-only (one unset per phase, its own
 * commit) so nothing competes with other operations in the same patch.
 *
 *   npx sanity exec migrations/stripLastUpdated.js --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

async function run() {
  const projects = await client.fetch(
    `*[_type == "project" && count(phases[defined(lastUpdated)]) > 0]{ _id, phases }`,
    {},
    {perspective: 'raw'},
  )

  console.log(`${projects.length} document(s) still have lastUpdated…`)

  for (const project of projects) {
    const keys = (project.phases ?? [])
      .filter((p) => p.lastUpdated !== undefined && p._key)
      .map((p) => p._key)

    for (const key of keys) {
      await client.patch(project._id).unset([`phases[_key=="${key}"].lastUpdated`]).commit()
    }
    console.log(`  ✓ ${project._id} (${keys.length} phase(s))`)
  }

  console.log('Done.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
