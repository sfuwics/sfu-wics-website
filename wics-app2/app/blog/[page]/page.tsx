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
    *[_type == "blogPost"] | order(publishedAt desc) {
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
  const data = await client.fetch(query);
  return data;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return generatePaginatedParams(posts.length, postsPerPage, "pg");
}

const BlogPage = async ({ params }: { params: { page: string } }) => {
  const posts = await getPosts();
  const currentPage = parseInt(params.page.replace("pg-", ""), 10);

  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-3">
      <Header title="Written by WiCS" />
      <PaginatedPosts posts={posts} currentPage={currentPage} url={"blog"} postsPerPage={postsPerPage} mode="dynamic"/>
    </div>
  );
};

export default BlogPage;
