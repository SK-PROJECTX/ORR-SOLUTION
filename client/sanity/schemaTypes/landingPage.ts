import {defineType, defineField} from 'sanity'

export const landingPage = defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title.en'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'localizedString',
    }),
    defineField({
      name: 'heroText',
      title: 'Hero Text',
      type: 'localizedText',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'showLatestBlogs',
      title: 'Show Latest Blogs Section',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'latestBlogsHeading',
      title: 'Latest Blogs Heading',
      type: 'localizedString',
      initialValue: {
        en: 'Latest from our blog',
        it: 'Ultime dal nostro blog'
      }
    }),
  ],
})
