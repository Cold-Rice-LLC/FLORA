import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'u67zcjih',
    dataset: 'production'
  },
  deployment: {
    autoUpdates: true,
  }
})
