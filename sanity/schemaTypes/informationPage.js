export default {
  name: 'informationPage',
  type: 'document',
  title: 'Information Page',
  preview: {
    prepare() {
      return { title: 'Information' }
    },
  },
  fields: [
    {
      name: 'internalTitle',
      type: 'string',
      hidden: true,
      readOnly: true,
      initialValue: 'Information',
    },
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
