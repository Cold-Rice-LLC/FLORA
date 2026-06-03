export default {
  name: 'news',
  type: 'document',
  title: 'News',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'The main title of the news item.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Auto-generated from the title. Used in the URL.',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'eyebrow',
      type: 'string',
      title: 'Eyebrow',
      description: 'Short label displayed above the title — e.g. a category or type.',
    },
    {
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
      description: 'Supporting text displayed below the title.',
    },
    {
      name: 'date',
      type: 'date',
      title: 'Date',
      description: 'Used for ordering and filtering as well as display on the frontend.',
    },
    {
      name: 'time',
      type: 'string',
      title: 'Time',
      description: 'Freeform time display — e.g. "7pm", "1–6pm", "Doors at 8".',
    },
    {
      name: 'modules',
      type: 'array',
      title: 'Modules',
      description: 'Build the news item content by adding image and text blocks in any order.',
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
              of: [{ type: 'block' }],
            },
            {
              name: 'captionEn',
              type: 'array',
              title: 'Caption (English)',
              of: [{ type: 'block' }],
            },
          ],
          preview: {
            select: {media: 'image', subtitle: 'captionEn'},
            prepare({media, subtitle}) {
              return {title: 'Image', media, subtitle}
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
              of: [{ type: 'block' }],
            },
            {
              name: 'textEn',
              type: 'array',
              title: 'Text (English)',
              of: [{ type: 'block' }],
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
}
