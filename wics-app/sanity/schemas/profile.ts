import { defineType, defineField } from "sanity";
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "profile" }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pronouns",
      title: "Pronouns",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "blurb",
      title: "Blurb",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn",
      type: "string",
      validation: (Rule) =>
        Rule.custom((url) => {
          const linkedInRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company|pub|profile)\/[a-zA-Z0-9-]+\/?$/;

          if (typeof url === 'undefined') return true; 
          if (!linkedInRegex.test(url)) {
            return "Must be a valid LinkedIn URL (https://www.linkedin.com/in/username)";
          }
          return true;
        }),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "mainImage",
    },
  },
});