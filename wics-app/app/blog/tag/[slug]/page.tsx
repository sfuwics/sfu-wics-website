import Header from "@/app/components/blog/BlogHeader";
import { client } from "@/sanity/lib/client";
import React from "react";
import PaginatedPosts from "@/app/components/PaginatedPosts";
import { notFound } from "next/navigation";
import { getSlugsByType, generateSlugParams } from "@/app/lib/staticParams";

export const dynamic = 'force-static'; 

async function getPostsByTag(tag: string) {
  const query = `
    *[_type == "blogPost" && references(*[_type == "tag" && slug.current == "${tag}"]._id)] | order(publishedAt desc) {
      _id,
      _type,
      title,
      slug,
      author,
      publishedAt,
      excerpt,
      "featureImage": coalesce(featureImage.asset->url, body[_type == "image"][0].asset->url),
      tags[]-> {
        _id,
        slug,
        name
      }
    }
  `;

  const posts = await client.fetch(query);
  return posts;
}

export async function generateStaticParams() {
  const slugs = await getSlugsByType("tag");
  return slugs.map((slug) => ({ slug }));
}


interface Params {
  params: {
    slug: string;
    page?: string;
  };
}

const BlogPageByTag = async ({ params }: Params) => {
  const posts = await getPostsByTag(params.slug); // Pass the slug parameter
  const postsPerPage = 5;

  // Handle pagination only if page parameter exists
  const currentPage = params.page
    ? parseInt(params.page.replace("pg-", ""), 10)
    : 1;

  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-6">
      <Header title={`#${params.slug}`} tags />
      <PaginatedPosts
        posts={posts}
        url={`blog/tag/${params.slug}`}
        postsPerPage={postsPerPage}
        mode="client"
      />
    </div>
  );
};
export default BlogPageByTag;
