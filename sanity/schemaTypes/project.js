import {ReferenceRadio} from '../components/ReferenceRadio.jsx'

export default {
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featuredImage',
      type: 'image',
      title: 'Featured Image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'featuredVideo',
      type: 'file',
      title: 'Featured Video',
      description:
        'Optional MP4. When set, this autoplaying muted video overrides the featured image on the home page and projects grid. A featured image is still required — it is used as the video’s poster and fallback.',
      options: {accept: 'video/mp4'},
      validation: (Rule) =>
        Rule.custom((video, context) =>
          video?.asset && !context.document?.featuredImage?.asset
            ? 'Add a Featured Image too — it is used as the video’s poster and fallback.'
            : true,
        ),
    },
    {
      name: 'projectNumber',
      type: 'number',
      title: 'Project Number',
    },
    {
      name: 'date',
      type: 'date',
      title: 'Date',
      description: 'Used for sorting. Year will be derived from this on the frontend.',
    },
    {
      name: 'previewText',
      type: 'text',
      title: 'Preview Text',
      description: 'Shows up when the project is hovered over in the projects/process grid.',
    },
    {
      name: 'introduction',
      type: 'array',
      title: 'Introduction',
      of: [{type: 'block'}],
    },
    {
      name: 'phases',
      type: 'array',
      title: 'Process Stages',
      description: 'Add one entry per stage. Each project stage can only be used once.',
      of: [
        {
          type: 'object',
          name: 'phase',
          title: 'Phase',
          initialValue: async (_params, context) => {
            const usedIds = (context.document?.phases ?? [])
              .map((p) => p.category?._ref)
              .filter(Boolean)
            const client = context.getClient({apiVersion: '2024-01-01'})
            const next = await client.fetch(
              `*[_type == "phaseCategory" && !(_id in $usedIds)] | order(order asc)[0]`,
              {usedIds},
            )
            return next ? {category: {_type: 'reference', _ref: next._id}} : {}
          },
          fields: [
            {
              name: 'category',
              type: 'reference',
              title: 'Project Stage',
              to: [{type: 'phaseCategory'}],
              validation: (Rule) => Rule.required(),
              components: {
                input: ReferenceRadio,
              },
            },
            {
              name: 'lastUpdated',
              type: 'date',
              title: 'Last Updated',
              description:
                'Set this when you add or update work on this stage. Used to sort the process grid.',
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
                    select: {media: 'poster'},
                    prepare({media}) {
                      return {title: 'Video', media}
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
              category: 'category.titleEn',
              categoryOrder: 'category.order',
              modules: 'modules',
            },
            prepare({category, categoryOrder, modules}) {
              const count = modules?.length ?? 0
              return {
                title:
                  categoryOrder && category
                    ? `[${categoryOrder}] ${category}`
                    : (category ?? 'Stage'),
                subtitle: `${count} module${count === 1 ? '' : 's'}`,
              }
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.custom((phases) => {
          if (!phases || phases.length === 0) return true
          const ids = phases.map((p) => p.category?._ref).filter(Boolean)
          const unique = new Set(ids)
          return ids.length === unique.size
            ? true
            : 'Each project stage can only be used once per project.'
        }),
    },
  ],
}
