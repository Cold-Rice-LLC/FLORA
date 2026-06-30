import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'u67zcjih',
    dataset: 'production'
  },
  studioHost: 'flora-ba',
  deployment: {
    appId: 'o1i0qa4059xwi8tmxpuabat6',
    autoUpdates: true,
  }
})
