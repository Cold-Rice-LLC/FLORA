import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {myStructure} from './myStructure'
import {DeleteProjectAction} from './actions/DeleteProjectAction'

export default defineConfig({
  name: 'default',
  title: 'Flora',

  projectId: 'u67zcjih',
  dataset: 'production',

  plugins: [structureTool({structure: myStructure}), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Swap the default Delete for projects with one that cascade-deletes the
    // project's phases and unlinks it from the Home page, so deleting a project
    // never gets blocked by "N documents refer to ...".
    actions: (prev, context) =>
      context.schemaType === 'project'
        ? prev.map((action) =>
            action.action === 'delete' ? DeleteProjectAction : action,
          )
        : prev,
  },
})
