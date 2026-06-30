export default {
  name: 'news',
  type: 'document',
  title: 'News',
  preview: {
    select: {title: 'title', date: 'date'},
    prepare({title, date}) {
      const formatted = date
        ? new Date(date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
        : 'No date'
      return {title, subtitle: formatted}
    },
  },
  orderings: [
    {
      title: 'Date, Newest First',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
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
              const text = subtitle?.[0]?.children?.map((c) => c.text).join('') ?? ''
              return {title: 'Image', media, subtitle: text}
            },
          },
        },
        {
          type: 'object',
          name: 'videoModule',
          title: 'Video',
          fields: [
            {
              name: 'video',
              type: 'file',
              title: 'Video',
              description: 'MP4 file. Plays muted and loops automatically.',
              options: {accept: 'video/mp4'},
            },
            {
              name: 'poster',
              type: 'image',
              title: 'Poster Image',
              description: 'Shown before the video loads. Videos display in a 16:9 frame.',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
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
            select: {media: 'poster', subtitle: 'captionEn'},
            prepare({media, subtitle}) {
              const text = subtitle?.[0]?.children?.map((c) => c.text).join('') ?? ''
              return {title: 'Video', media, subtitle: text}
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
              const text = subtitle?.[0]?.children?.map((c) => c.text).join('') ?? ''
              return {title: 'Text', subtitle: text}
            },
          },
        },
      ],
    },
  ],
}
