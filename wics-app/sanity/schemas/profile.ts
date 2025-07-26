import { defineType, defineField } from "sanity";
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "profile" }),
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "role",
      title: "Role",
      type: "string",
    },
    {
      name: "pronouns",
      title: "Pronouns",
      type: "string",
    },
    {
      name: "blurb",
      title: "Blurb",
      type: "text",
    },
    defineField({
      name: "linkedin",
      title: "LinkedIn",
      type: "string",
      validation: (Rule) =>
        Rule.required().custom((url) => {
          const linkedInRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company|pub|profile)\/[a-zA-Z0-9-]+\/?$/;

          if (typeof url === 'undefined') return true; 
          if (!linkedInRegex.test(url)) {
            return "Must be a valid LinkedIn URL (e.g., https://www.linkedin.com/in/username)";
          }
          return true;
        }),
    }),
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      }
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "mainImage",
    },
  },
});