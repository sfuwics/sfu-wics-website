import { defineType } from "sanity";
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list';

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
    {
      name: "linkedin",
      title: "LinkedIn",
      type: "string",
    },
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
