import {CogIcon, HomeIcon, InfoOutlineIcon, ImagesIcon, BookIcon, TagIcon} from '@sanity/icons'

export const myStructure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      S.listItem()
        .title('Pages')
        .icon(HomeIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home')
                .icon(HomeIcon)
                .child(S.document().schemaType('homePage').documentId('homePage')),

              S.listItem()
                .title('Information')
                .icon(InfoOutlineIcon)
                .child(S.document().schemaType('informationPage').documentId('informationPage')),
            ])
        ),

      S.listItem()
        .title('Index')
        .icon(ImagesIcon)
        .child(
          S.list()
            .title('Index')
            .items([
              S.listItem()
                .title('Projects')
                .icon(ImagesIcon)
                .child(S.documentTypeList('project').title('Projects')),

              S.listItem()
                .title('Project Stages')
                .icon(TagIcon)
                .child(
                  S.documentTypeList('phaseCategory')
                    .title('Project Stages')
                    .defaultOrdering([{field: 'order', direction: 'asc'}])
                ),
            ])
        ),

      S.listItem()
        .title('News')
        .icon(BookIcon)
        .child(S.documentTypeList('news').title('News')),
    ])
