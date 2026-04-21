import {defineType, defineField} from 'sanity'

export const engagementPage = defineType({
  name: 'engagementPage',
  title: 'Engagement Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'hero',
          title: 'Hero Section',
          fields: [
            {name: 'heading', type: 'string', title: 'Heading'},
            {name: 'subheading', type: 'text', title: 'Subheading'},
            {name: 'buttonText', type: 'string', title: 'Button Text'},
            {name: 'image', type: 'image', title: 'Image'},
          ],
        },
        {
          type: 'object',
          name: 'imageText',
          title: 'Image & Text Block',
          fields: [
            {name: 'heading', type: 'string', title: 'Heading'},
            {name: 'text', type: 'array', of: [{type: 'block'}], title: 'Text'},
            {name: 'image', type: 'image', title: 'Image'},
            {name: 'reversed', type: 'boolean', title: 'Reverse Layout (Image on Right)', initialValue: false},
          ],
        },
        {
          type: 'object',
          name: 'cta',
          title: 'Call to Action',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'buttonText', type: 'string', title: 'Button Text'},
            {name: 'link', type: 'string', title: 'Link'},
          ],
        },
      ],
    }),
  ],
})
