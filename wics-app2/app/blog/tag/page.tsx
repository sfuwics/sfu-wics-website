import Header from '@/app/components/blog/Header';
import { Tag } from '@/app/utils/Interface';
import Link from 'next/link';
import React from 'react';
import { client } from "@/sanity/lib/client";

async function getAllTags() {
  const query = `
    *[_type == "tag"] {
    name,
    slug,
    _id,
    "postCount": count(*[_type == "post" && references("tags", ^._id)])
  }
  `;

  const tags = client.fetch(query);
  return tags;
}

export const revalidate = 60;

const page = async () => {
  const tags: Tag = await getAllTags()
  return (
    <div>
      <Header title="Tags" />

      <div>
        {tags?.length > 0 &&
        tags?.map((tag) => (
          <Link key={tag?._id} href={`/tag/${tag.slug.current}`}>
            <div className='mb-2 p-2 text-sm lowercase border hover:text'>
              #{tag.name} ({tag?.postCount})
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default page
