export default {
  name: 'homePage',
  type: 'document',
  title: 'Home Page',
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
