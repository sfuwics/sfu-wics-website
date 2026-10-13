import Header from "@/app/components/blog/BlogHeader";
import { Tag } from "@/app/lib/Interface";
import Link from "next/link";
import React from "react";
import { client } from "@/sanity/lib/client";
import { createMetadata } from "@/app/lib/metadata";

export const metadata = createMetadata('Tags');

async function getAllTags() {
  // Tag pages only list blog posts, so count those
  const query = `
    *[_type == "tag"] {
    name,
    slug,
    _id,
    "postCount": count(*[_type == "blogPost" && references(^._id)])
  }
  `;

  const tags = client.fetch(query);
  return tags;
}

const page = async () => {
  const tags: Tag[] = await getAllTags();
  return (
    <div className="container mx-auto max-w-3xl px-8 pt-24">
      <Header title="Tags" />

      <div>
        {tags?.length > 0 &&
          tags?.map((tag) => (
            <Link key={tag?._id} href={`/blog/tag/${tag.slug.current}`}>
              <div className="mb-2 border p-2 text-sm lowercase">
                #{tag.name} ({tag?.postCount})
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default page;
