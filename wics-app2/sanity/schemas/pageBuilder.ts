import { Rule } from "sanity";

export const pageBuilder = {
  name: "pageBuilder",
  title: "Page Builder",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "link",
      title: "Link",
      type: "string",
      hidden: ({ parent }) => !parent?.logo,
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule: Rule) => Rule.required().error("Required"),
    },
    {
      name: "blurb",
      title: "Blurb",
      type: "array",
      of: [{ type: "block" }],
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
      name: "tag",
      title: "Tag",
      type: "reference",
      to: [{ type: "tag" }],
      description: "Choose a tag to query posts for this page",
    }
    
  ],
};
