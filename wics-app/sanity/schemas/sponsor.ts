import { Rule } from "sanity";
import { defineType } from "sanity";
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list';

export const sponsor = {
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "sponsor" }),
    {
      name: "companyName",
      title: "Company Name",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Company Name is required."),
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      validation: (Rule: Rule) => Rule.required().error("Logo is required."),
    },
    {
      name: "link",
      title: "Link to Page",
      type: "slug",
      options: {
        source: "companyName",
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-zA-Z0-9\-]/g, ""),
      },
      description: "This will generate the path for the sponsor page.",
      validation: (Rule: Rule) => Rule.required().error("Link is required."),
    },
    {
      name: "tier",
      title: "Sponsorship Tier",
      type: "string",
      options: {
        list: [
          { title: "Platinum", value: "platinum" },
          { title: "Gold", value: "gold" },
          { title: "Silver", value: "silver" },
        ],
        layout: "dropdown",
      },
      validation: (Rule: Rule) => Rule.required().error("Sponsorship Tier is required."),
    },
  ],
  preview: {
    select: {
      title: "companyName",
      subtitle: "tier",
      media: "logo",
    },
    prepare(selection: { title: string; subtitle: string; media: any }) {
      const { title, subtitle, media } = selection;
      return {
        title,
        subtitle: `Tier: ${subtitle?.charAt(0).toUpperCase() + subtitle?.slice(1)}`,
        media,
      };
    },
  },
};
