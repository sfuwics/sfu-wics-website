import { Rule } from "sanity";

export const post = {
  name: "post",
  title: "Post",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" },
         {
          type: "object",
          name: "video",
          title: "Video",
          preview: {
            select: {
              title: 'caption',
              media: 'thumbnail'
            }
          },
          fields: [
            {
              name: "videoType",
              title: "Video Type",
              type: "string",
              options: {
                list: [
                    { title: "Embed URL", value: "embed" },
                    { title: "Upload", value: "file" }
                ],
                layout: "radio"
              }
            },
            {
              name: "url",
              title: "Video URL",
              type: "url",
              hidden: ({ parent }) => parent?.videoType !== "embed",
              validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] })
            },
            {
              name: "videoFile",
              title: "Video File",
              type: "file",
              hidden: ({ parent }) => parent?.videoType !== "file",
              options: { accept: "video/mp4,video/webm" }
            },
            {
              name: "orientation",
              title: "Orientation",
              type: "string",
              options: {
                list: [
                  { title: "Landscape", value: "landscape" },
                  { title: "Portrait", value: "portrait" }
                ],
                layout: "radio"
              },
              initialValue: "landscape" 
            },
          ],
        },
      ],
    },
    {
      name: "isEvent",
      type: "boolean",
      title: "Is Event Announcement?",
      description: "Check this box if this post is for an event announcement",
    },
    {
      name: "isEventRecap",
      type: "boolean",
      title: "Is this post about a finished event?",
      description: "Check this box if this post is for a finished event",
    },
    {
      name: "eventDate",
      title: "Event Date",
      type: "date",
      hidden: ({ parent }) => !parent?.isEvent, // Hide if isEvent is false
      validation: (Rule: Rule) =>
        Rule.custom((value, context) =>
          context.parent.isEvent && !value ? "Event date is required" : true
        ),
    },
    {
      name: "images",
      type: "array",
      title: "Carousel Images",
      description: "Add images for the carousel",
      options: { sortable: true },
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              description: "Important for accessibility and SEO.",
            },
          ],
        },
      ],
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    },
  ],
};
