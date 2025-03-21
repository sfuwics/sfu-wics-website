import React from "react";
import PaginatedPosts from "@/app/components/PaginatedPosts";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import Header from "@/app/components/Header";

async function getPosts() {
  const query = `
    *[_type == "blogPost" || _type == "post" && isEventRecap == true ] | order(publishedAt desc) {
      _id,
      _type,
      title,
      publishedAt,
      slug,
      "excerpt": excerpt,
      "author": author,
      "featureImage": coalesce(featureImage.asset->url, body[_type == "image"][0].asset->url),
      "tags": tags[]->{
        _id,
        slug,
        name
      },
      "headings": body[style in ["h1", "h2", "h3", "h4", "h5"]],
      body[] {
        ...,
        _type == "link" => {
          "href": @.href,
          "text": @.text
        },
        markDefs[] {
          ...,
          _type == "link" => {
            "href": @.href,
            "text": @.text
          }
        }
      },
      isEvent,
      images[] {
        _key,
        asset->{
          _id,
          url
        },
        alt
      }
    }
  `;
  return await client.fetch(query);
}

const revalidate = 60;

const PastEventsPage = async ({ params }: { params: { page: string } }) => {
  const posts = await getPosts();
  const postsPerPage = 5;

  const currentPage = parseInt(params.page.replace("pg-", ""), 10);

  // Handle invalid page numbers
  if (isNaN(currentPage) || currentPage < 1) {
    notFound(); // Render 404 page for invalid pages
  }

  return (
    <div className="mx-auto max-w-3xl px-3">
      <Header title="Past Events" />
      <PaginatedPosts posts={posts} currentPage={currentPage} url={"past-events"} postsPerPage={postsPerPage} />
    </div>
  );
};

export default PastEventsPage;
