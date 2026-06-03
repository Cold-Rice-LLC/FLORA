export default {
  name: 'informationPage',
  type: 'document',
  title: 'Information Page',
  fields: [
    {
      name: 'infoTextEs',
      type: 'array',
      title: 'Info Text (Spanish)',
      of: [{ type: 'block' }],
    },
    {
      name: 'infoTextEn',
      type: 'array',
      title: 'Info Text (English)',
      of: [{ type: 'block' }],
    },
  ],
}
