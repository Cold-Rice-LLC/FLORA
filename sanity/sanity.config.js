import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {myStructure} from './myStructure'

export default defineConfig({
  name: 'default',
  title: 'Flora',

  projectId: 'u67zcjih',
  dataset: 'production',

  plugins: [structureTool({structure: myStructure}), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
