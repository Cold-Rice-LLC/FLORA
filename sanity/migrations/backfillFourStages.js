/**
 * One-time migration: ensure every project has all four stages (one per
 * phaseCategory, in order 1–4). Stages the project already uses keep their
 * content and key; missing stages are added empty. Needed because the Add
 * button is being removed, so projects can no longer gain a stage by hand.
 *
 *   npx sanity exec migrations/backfillFourStages.js --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

const rndKey = () => Math.random().toString(36).slice(2, 12)

async function run() {
  const categories = await client.fetch(
    `*[_type == "phaseCategory" && !(_id in path("drafts.**"))] | order(order asc){_id, order}`,
  )
  const orderedIds = categories.map((c) => c._id)
  const known = new Set(orderedIds)

  const projects = await client.fetch(
    `*[_type == "project"]{ _id, phases }`,
    {},
    {perspective: 'raw'},
  )
  console.log(`Scanning ${projects.length} project document(s)…`)

  let patched = 0
  for (const project of projects) {
    const existing = project.phases ?? []
    const byCat = new Map()
    for (const ph of existing) {
      if (ph.category?._ref) byCat.set(ph.category._ref, ph)
    }

    // The four stages in order, reusing existing phase data where present.
    const ordered = categories.map((cat, i) => {
      const found = byCat.get(cat._id)
      if (found) return found
      return {
        _key: `stage${i + 1}-${rndKey()}`,
        _type: 'phase',
        category: {_type: 'reference', _ref: cat._id},
        modules: [],
      }
    })

    // Keep any phase whose category isn't one of the four (shouldn't happen) so
    // no content is lost.
    const leftovers = existing.filter((ph) => !known.has(ph.category?._ref))
    const finalPhases = [...ordered, ...leftovers]

    // Skip projects that are already a correct, in-order set of four.
    const currentOrder = existing.map((ph) => ph.category?._ref).join(',')
    if (currentOrder === orderedIds.join(',') && leftovers.length === 0) continue

    await client.patch(project._id).set({phases: finalPhases}).commit()
    patched++
    console.log(`  ✓ ${project._id} (${existing.length} → ${finalPhases.length} stages)`)
  }

  console.log(`Done. Patched ${patched} project(s).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
