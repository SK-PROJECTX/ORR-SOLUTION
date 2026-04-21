import {defineType, defineField} from 'sanity'

export const resourcesPage = defineType({
  name: 'resourcesPage',
  title: 'Resources & Blogs Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroDescription1',
      title: 'Hero Description 1',
      type: 'text',
    }),
    defineField({
      name: 'heroDescription2',
      title: 'Hero Description 2',
      type: 'text',
    }),
    defineField({
      name: 'heroDescription3',
      title: 'Hero Description 3',
      type: 'text',
    }),
    defineField({
      name: 'heroButton1Text',
      title: 'Hero Button 1 Text',
      type: 'string',
      initialValue: 'Request Early Access',
    }),
    defineField({
      name: 'heroButton2Text',
      title: 'Hero Button 2 Text',
      type: 'string',
      initialValue: 'Explore our services',
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
    }),
  ],
})
