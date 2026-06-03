import {ReferenceRadio} from '../components/ReferenceRadio.jsx'

export default {
  name: 'phase',
  type: 'document',
  title: 'Phase',
  fields: [
    {
      name: 'project',
      type: 'reference',
      title: 'Project',
      to: [{type: 'project'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      type: 'reference',
      title: 'Phase Category',
      to: [{type: 'phaseCategory'}],
      validation: (Rule) => Rule.required(),
      components: {
        input: ReferenceRadio,
      },
    },
    {
      name: 'modules',
      type: 'array',
      title: 'Modules',
      description: 'Build the phase content by adding image and text blocks in any order.',
      of: [
        {
          type: 'object',
          name: 'imageModule',
          title: 'Image',
          fields: [
            {
              name: 'image',
              type: 'image',
              title: 'Image',
              options: {hotspot: true},
            },
            {
              name: 'captionEs',
              type: 'array',
              title: 'Caption (Spanish)',
              of: [{type: 'block'}],
            },
            {
              name: 'captionEn',
              type: 'array',
              title: 'Caption (English)',
              of: [{type: 'block'}],
            },
          ],
          preview: {
            select: {media: 'image'},
            prepare({media}) {
              return {title: 'Image', media}
            },
          },
        },
        {
          type: 'object',
          name: 'textModule',
          title: 'Text',
          fields: [
            {
              name: 'textEs',
              type: 'array',
              title: 'Text (Spanish)',
              of: [{type: 'block'}],
            },
            {
              name: 'textEn',
              type: 'array',
              title: 'Text (English)',
              of: [{type: 'block'}],
            },
          ],
          preview: {
            select: {subtitle: 'textEn'},
            prepare({subtitle}) {
              return {title: 'Text', subtitle}
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      projectTitle: 'project.title',
      categoryTitle: 'category.titleEn',
      categoryOrder: 'category.order',
    },
    prepare({projectTitle, categoryTitle, categoryOrder}) {
      return {
        title: projectTitle ?? 'No project',
        subtitle:
          categoryOrder && categoryTitle ? `[${categoryOrder}] ${categoryTitle}` : 'No category',
      }
    },
  },
  orderings: [
    {
      title: 'Project, then Phase Order',
      name: 'projectPhaseOrder',
      by: [
        {field: 'project.title', direction: 'asc'},
        {field: 'category.order', direction: 'asc'},
      ],
    },
  ],
}
