import React from "react";
import PaginatedPosts from "@/app/components/PaginatedPosts";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import Header from "@/app/components/Header";
import { generatePaginatedParams } from "@/app/lib/generatePaginatedParams";

export const dynamic = 'force-static';

const postsPerPage = 5;

async function getPosts() {
  const query = `
    *[_type == "blogPost" || _type == "post"] | order(publishedAt desc) {
      _id,
      _type,
      title,
      publishedAt,
      slug,
      "excerpt": excerpt,
      "author": author,
      "featureImage": coalesce(featureImage.asset->url, body[_type == "image"][0].asset->url),
      "tags": tags[]->{ _id, slug, name },
      "headings": body[style in ["h1", "h2", "h3", "h4", "h5"]],
      body[] {
        ..., _type == "link" => { "href": @.href, "text": @.text },
        markDefs[] {
          ..., _type == "link" => { "href": @.href, "text": @.text }
        }
      },
      isEvent,
      images[] { _key, asset->{ _id, url }, alt }
    }
  `;
  return await client.fetch(query);
}

export async function generateStaticParams() {
  const posts = await getPosts();
  const totalPages = Math.ceil(posts.length / postsPerPage);
  
  return Array.from({ length: totalPages }).map((_, i) => ({
    page: `pg-${i + 1}` // Directly return { page: string } without params wrapper
  }));
}


const NewsroomPage = async ({ params }: { params: { page: string } }) => {
  const posts = await getPosts();
  const currentPage = parseInt(params.page.replace("pg-", ""), 10);

  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-3">
      <Header title="Newsroom" />
      <PaginatedPosts
        posts={posts}
        currentPage={currentPage}
        url="newsroom"
        postsPerPage={postsPerPage}
        mode="dynamic"
      />
    </div>
  );
};

export default NewsroomPage;
