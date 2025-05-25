import {Rule} from 'sanity'

export const personList = {
  name: 'personList',
  title: 'Person List',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of this person list (e.g., Team Members)',
    },
    {
      name: 'people',
      title: 'People',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'person',
          title: 'Person',
          fields: [
            {
              name: 'role',
              title: 'Role',
              type: 'string',
              description: 'Role or title of the person',
            },
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required().min(1).max(100),
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
            },
          },
        },
      ],
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
}
