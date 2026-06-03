export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
  fields: [
    {
      name: 'internalTitle',
      type: 'string',
      hidden: true,
      readOnly: true,
      initialValue: 'Site Settings',
    },
    {
      name: 'siteTitle',
      type: 'string',
      title: 'Site Title',
    },
    {
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description',
      rows: 3,
    },
    {
      name: 'ogImage',
      type: 'image',
      title: 'OG Image',
    },
  ],
}
