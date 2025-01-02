import Header from "@/app/components/blog/Header";
import React from "react";
import { client } from "@/sanity/lib/client";
import { Post } from "@/app/utils/Interface";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import { slugify } from "@/app/utils/helpers";
import { RichTextComponents } from "@/app/components/blog/RichTextComponents";

interface Params {
  params: {
    slug: string;
  };
}

async function getPost(slug: string, commentsOrder: string = "desc") {
  const query = `
  *[_type == "post" && slug.current == "${slug}"][0] {
    title,
    slug,
    author,
    publishedAt,
    excerpt,
    _id,
    "headings": body[style in ["h1", "h2", "h3", "h4", "h5", "h6"]],
    body[] {
      ...,
      _type == "image" => {
        "url": asset->url,
      "dimensions": asset->metadata.dimensions,
      "alt": alt
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

const revalidate = 60;

const page = async ({ params }: Params) => {
  const post: Post = await getPost(params?.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
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
          <PortableText value={post?.body} components={RichTextComponents} />
        </div>
      </div>
    </div>
  );
};

export default page;

// styling for blog post
// max-w-2xl
const richTextStyles = `
mt-14
text-left
text-lg

m-auto
prose-headings:my-3
prose-heading:text-2xl
prose-p:mb-8
prose-p:leading-7
prose-li:list-disc
prose-li:leading-7
prose-li:ml-4
`;
