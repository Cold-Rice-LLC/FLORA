export default {
  name: 'homePage',
  type: 'document',
  title: 'Home Page',
  preview: {
    prepare() {
      return { title: 'Home' }
    },
  },
  fields: [
    {
      name: 'featuredProjects',
      type: 'array',
      title: 'Featured Projects',
      description: 'Select and order the projects to feature on the home page.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }],
        },
      ],
    },
  ],
}
