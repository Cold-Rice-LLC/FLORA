import {useState} from 'react'
import {TrashIcon} from '@sanity/icons'
import {useToast} from '@sanity/ui'
import {useClient} from 'sanity'

// Replaces the default "Delete" action for projects.
// In one transaction it: deletes every phase belonging to the project,
// unlinks the project from any document that references it (e.g. the home
// page's Featured Projects list), then deletes the project itself.
// Doing it all in a single transaction means Sanity never sees a dangling
// reference, so it never blocks the delete with "N documents refer to ...".
export function DeleteProjectAction(props) {
  const {id, onComplete} = props
  const client = useClient({apiVersion: '2024-01-01'})
  const toast = useToast()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const publishedId = id.replace(/^drafts\./, '')
  const draftId = `drafts.${publishedId}`

  async function handleDelete() {
    setIsDeleting(true)
    try {
      // Phases that belong to this project (published + drafts).
      const phaseIds = await client.fetch(`*[_type == "phase" && references($pid)]._id`, {
        pid: publishedId,
      })

      // Other documents that reference the project via an array field
      // (the home page Featured Projects list). Phases are handled above.
      const refererIds = await client.fetch(
        `*[references($pid) && _type != "phase" && _id != $pub && _id != $draft]._id`,
        {pid: publishedId, pub: publishedId, draft: draftId},
      )

      const tx = client.transaction()

      phaseIds.forEach((pid) => tx.delete(pid))

      refererIds.forEach((refId) => {
        tx.patch(refId, (p) => p.unset([`featuredProjects[_ref=="${publishedId}"]`]))
      })

      tx.delete(publishedId)
      tx.delete(draftId)

      await tx.commit({visibility: 'async'})

      toast.push({status: 'success', title: 'Project deleted'})
      setDialogOpen(false)
      onComplete()
    } catch (err) {
      toast.push({
        status: 'error',
        title: 'Could not delete project',
        description: err.message,
      })
      setIsDeleting(false)
    }
  }

  return {
    label: isDeleting ? 'Deleting…' : 'Delete project',
    icon: TrashIcon,
    tone: 'critical',
    disabled: isDeleting,
    onHandle: () => setDialogOpen(true),
    dialog: dialogOpen && {
      type: 'confirm',
      tone: 'critical',
      message:
        'This permanently deletes this project, all of its phases, and removes it from the Home page. This cannot be undone. Continue?',
      confirmButtonText: 'Delete everything',
      onCancel: () => setDialogOpen(false),
      onConfirm: handleDelete,
    },
  }
}
