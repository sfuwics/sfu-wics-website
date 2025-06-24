import Header from "@/app/components/blog/BlogHeader";
import React from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { RichTextComponents } from "@/app/components/blog/RichTextComponents";
import { getSlugsByType } from "@/app/lib/staticParams";

export const dynamic = "force-static";

interface Params {
  params: {
    slug: string;
  };
}

async function getPost(slug: string) {
  const query = `
  *[_type == "blogPost" && slug.current == $slug][0] {
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
              "lqip": asset->metadata.lqip,
              "exists": defined(asset->url)

          }
      },
      tags[]-> {
          _id,
          slug,
          name
      }
    }
  `;

  try {
    const post = await client.fetch(query, { slug });
    if (!post) {
      console.error(`Post not found for slug: ${slug}`);
      return null;
    }
    return post;
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }

  // const post = await client.fetch(query);
  // return post;
}

// export async function generateStaticParams() {
//   const slugs = await getSlugsByType("blogPost");
//   return slugs.map(({ slug }) => ({ slug }));
// }

export async function generateStaticParams() {
  const slugs = await getSlugsByType("blogPost");

  // Verify each slug exists
  const validSlugs = await Promise.all(
    slugs.map(async ({ slug }) => {
      const exists = await client.fetch(
        `count(*[_type == "blogPost" && slug.current == $slug])`,
        { slug },
      );
      return exists > 0 ? { slug } : null;
    }),
  ).then((results) => results.filter(Boolean));

  return validSlugs;
}

const page = async ({ params }: Params) => {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <div className="container mx-auto max-w-2xl px-10 pt-24">
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
m-auto
mt-10 sm:mt-14
text-left

prose-p:text-sm sm:prose-p:text-base
prose-p:leading-6 sm:prose-p:leading-7

prose-headings:my-3
prose-heading:text-2xl
prose-p:my-2

prose-li:list-disc
prose-li:text-sm sm:prose-li:text-base
prose-li:leading-6 sm:prose-li:leading-7
prose-li:ml-1 sm:prose-li:ml-4
`;
