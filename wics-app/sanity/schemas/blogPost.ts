import { Rule } from "sanity";

export const blogPost = {
  name: "blogPost",
  title: "Blog Post",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "author",
      title: "Author",
      type: "string",
      validation: (Rule: Rule) => Rule.max(200).error("Max 80 characters"),
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      validation: (Rule: Rule) => Rule.max(200).error("Max 200 characters"),
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { 
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }]
        },
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
              name: "thumbnail",
              title: "Thumbnail",
              type: "image",
              options: { hotspot: true }
            },
            {
              name: "caption",
              title: "Caption",
              type: "string"
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
            {
              name: "autoplay",
              title: "Autoplay",
              type: "boolean",
              initialValue: false
            },
            {
              name: "loop",
              title: "Loop",
              type: "boolean",
              initialValue: false
            },
            {
              name: "controls",
              title: "Show Controls",
              type: "boolean",
              initialValue: true
            },
          ],
        },
      ],
    },
    {
      name: "featureImage",
      title: "Feature Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "feature image",
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