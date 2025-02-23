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
      of: [{ type: "block" }],
    },
    {
      name: "isEvent",
      type: "boolean",
      title: "Is Event Announcement?",
      description: "Check this box if this post is for an event announcement",
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
  ],
};
