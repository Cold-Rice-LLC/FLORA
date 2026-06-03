export default {
  name: 'phaseCategory',
  type: 'document',
  title: 'Project Stage',
  fields: [
    {
      name: 'titleEs',
      type: 'string',
      title: 'Title (Spanish)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'titleEn',
      type: 'string',
      title: 'Title (English)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      type: 'number',
      title: 'Order',
      description: 'Controls the display order of stages on the project page. Lower numbers appear first. Must be unique.',
      validation: (Rule) =>
        Rule.required()
          .integer()
          .positive()
          .custom(async (value, context) => {
            if (!value) return true
            const client = context.getClient({ apiVersion: '2024-01-01' })
            const count = await client.fetch(
              `count(*[_type == "phaseCategory" && order == $order && _id != $id])`,
              { order: value, id: context.document._id }
            )
            return count === 0 ? true : 'A project stage with this order value already exists.'
          }),
    },
  ],
  preview: {
    select: { titleEs: 'titleEs', titleEn: 'titleEn', order: 'order' },
    prepare({ titleEs, titleEn, order }) {
      return {
        title: `${titleEs} / ${titleEn}`,
        subtitle: `Stage ${order}`,
      }
    },
  },
  orderings: [
    {
      title: 'Stage Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
}
