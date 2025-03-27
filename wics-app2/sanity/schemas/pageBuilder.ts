import { Rule } from "sanity";

export const pageBuilder = {
  name: "pageBuilder",
  title: "Page Builder",
  type: "document",

  fields: [
    {
      name: "sponsor",
      title: "Sponsor",
      type: "reference",
      to: [{ type: "sponsor" }],
      description: "If this page is for a sponsor, select the sponsor.",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Title is required."),
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => !!parent?.sponsor,
    },
    {
      name: "link",
      title: "Link",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule: Rule) => Rule.required().error("Slug is required."),
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
      description: "Choose a tag to query posts for this page.",
    },
  ],

  preview: {
    select: {
      title: "title",
      sponsorTitle: "sponsor.companyName",
      media: "logo",
      sponsorLogo: "sponsor.logo",
    },
    prepare(selection) {
      const { title, sponsorTitle, media, sponsorLogo } = selection;
      return {
        title: sponsorTitle || title,
        media: sponsorLogo || media,
      };
    },
  },
};
