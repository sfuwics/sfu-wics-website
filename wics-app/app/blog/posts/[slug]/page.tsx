import Header from "@/app/components/blog/BlogHeader";
import React from "react";
import { client } from "@/sanity/lib/client";
import { Post } from "@/app/lib/Interface";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { RichTextComponents } from "@/app/components/blog/RichTextComponents";
import { getSlugsByType, generateSlugParams } from "@/app/lib/staticParams";

import { enhancePostImages } from "@/app/lib/image-utils";

export const dynamic = 'force-static'; 

interface Params {
  params: {
    slug: string;
  };
}

async function getPost(slug: string) {
  const query = `
  *[_type == "blogPost" && slug.current == "${slug}"][0] {
      title,
      slug,
      author,
      publishedAt,
      excerpt,
      _id,
      "headings": body[style in ["h1", "h2", "h3", "h4", "h5"]],
      body[] {
          ...,
          children[] {
              _key,
              _type,
              text,
              marks
          },
          markDefs[] {
              _key,
              _type,
              "href": @.href
          },
          _type == "image" => {
              "url": asset->url,
              "dimensions": asset->metadata.dimensions,
              "alt": alt,
              "lqip": asset->metadata.lqip
          }
      },
      tags[]-> {
          _id,
          slug,
          name
      }
    }
  `;

  const post = await client.fetch(query);
  return post;
}

export async function generateStaticParams() {
  const slugs = await getSlugsByType("blogPost");
  return slugs.map(({ slug }) => ({ slug })); 
}

const page = async ({ params }: Params) => {
  const initialPost = await getPost(params.slug);
  const post = await enhancePostImages(initialPost);

  if (!post) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <Header title={post?.title} />
      <div className="text-left">
        <p className="text-wics-blue-500">{post?.author}</p>
        <span className="text-wics-blue-500">
          {new Date(post?.publishedAt).toDateString()}
        </span>
        <div className="mt-5">
          {post?.tags?.map((tag) => (
            <Link key={tag?._id} href={`/blog/tag/${tag.slug.current}`}>
              <span className="mr-2 rounded-sm border p-1 text-sm lowercase">
                #{tag.name}
              </span>
            </Link>
          ))}
        </div>

        <div className={richTextStyles}>
          <PortableText
            value={post?.body}
            components={RichTextComponents}
            onMissingComponent={(type, value) => {
              console.warn(`Missing component for type: ${type}`, value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default page;

// styling for blog post
const richTextStyles = `
mt-14
text-left
text-lg

m-auto
prose-headings:my-3
prose-heading:text-2xl
prose-p:my-2
prose-p:leading-7
prose-li:list-disc
prose-li:leading-7
prose-li:ml-4
`;
