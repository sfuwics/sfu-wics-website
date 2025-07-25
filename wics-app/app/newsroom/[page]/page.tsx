import React from "react";
import PaginatedPosts from "@/app/components/PaginatedPosts";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import Header from "@/app/components/Header";
import { createMetadata } from "@/app/lib/metadata";

export const metadata = createMetadata('Newsroom');

const postsPerPage = 5;

async function getPosts() { // 
  const query = `
    *[_type == "blogPost" || _type == "post"] | order(publishedAt desc) {
      _id,
      _type,
      title,
      publishedAt,
      slug,
      "excerpt": excerpt,
      "author": author,
       "featureImage": coalesce(
        featureImage {
          asset-> {
            url,
            metadata {
              lqip
            }
          }
        },
        body[_type == "image"][0] {
          asset-> {
            url,
            metadata {
              lqip
            }
          }
        }
      ),
      "tags": tags[]->{ _id, slug, name },
      "headings": body[style in ["h1", "h2", "h3", "h4", "h5"]],
      body[] {
        ..., _type == "link" => { "href": @.href, "text": @.text },
        markDefs[] {
          ..., _type == "link" => { "href": @.href, "text": @.text }
        },
        _type == "video" => {
          ...,
          videoFile {
            asset->
          },
          orientation,
        },
      },
      isEvent,
      images[] {
        _key,
        asset->{
          _id,
          url,
          metadata {
            lqip
          }
        },
        alt
      }
    }
  `;
  return await client.fetch(query);
}

export async function generateStaticParams() {
  const posts = await getPosts();
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return Array.from({ length: totalPages }).map((_, i) => ({
    page: `pg-${i + 1}`, // Directly return { page: string } without params wrapper
  }));
}

const NewsroomPage = async ({ params }: { params: { page: string } }) => {
  const posts = await getPosts();
  const currentPage = parseInt(params.page.replace("pg-", ""), 10);

  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  return (
    <div className="container mx-auto px-8 pt-24 max-w-3xl">
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
