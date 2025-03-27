import Header from "@/app/components/Header";
import React from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import { RichTextComponents } from "@/app/components/blog/RichTextComponents";
import ImageCarousel from "@/app/components/carousels/ImageCarousel";

import PostComponent from "@/app/components/PostComponent";
import BlogPostComponent from "@/app/components/blog/BlogPostComponent";

interface Params {
  params: {
    slug: string;
  };
}

async function getPage(slug: string) {
  const query = `
    *[_type == "pageBuilder" && slug.current == "${slug}"][0] {
      title,
      slug,
      logo {
        asset->{
          url
        }
      },
      link,
      blurb[] {
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
      },
      images[] {
        _key,
        asset->{
          _id,
          url
        },
        alt
      },
      tag-> {
        _id,
        slug,
        name
      }
    }
  `;

  const post = await client.fetch(query);
  return post;
}

async function getPostsByTag(tag: string) {
  const query = `
    *[
      _type in ["blogPost", "post"] &&
      references(*[_type == "tag" && slug.current == "${tag}"]._id)
    ] | order(publishedAt desc) {
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

const page = async ({ params }: Params) => {
  const page: Page = await getPage(params?.slug);

  if (page?.tag) {
    
  }

  const posts = await getPostsByTag(page?.tag?.slug?.current);
  console.log("Tag slug:", page?.tag?.slug);


  console.log(posts);


  if (!page) {
    notFound();
  }

  return (
    <div className="xl:mx-56">
      <Header title={page?.title} />
      <div className="flex justify-center pb-10">
          {page.logo && page?.link && (
            <a href={page.link} target="_blank" rel="noopener noreferrer">
              <Image
                src={page.logo.asset.url}
                alt={page.title || "Page Logo"}
                width={200}
                height={200}
              />
            </a>
          )}
        </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-4">
        <div className={richTextStyles}>
          <PortableText value={page?.blurb} components={RichTextComponents} 
          />
        </div>

        <div className="py-3">
          <ImageCarousel images={page?.images} />
        </div>
      </div>
      
      <div className="mt-10 sm:mt-24">
        {posts?.length > 0 &&
                posts.map((post) => (
                  <div key={post?._id}>
                    {post?._type === "blogPost" && (
                      <BlogPostComponent post={post} />
                    )}
                    {post?._type === "post" && (
                      <PostComponent post={post} />
                    )}
                  </div>
          ))}
      </div>

    </div>
  );
};

export default page;

const richTextStyles = `
text-left
text-sm
sm:text-base

m-auto
prose-headings:my-3
prose-heading:text-2xl
prose-p:mb-4
prose-p:leading-6
prose-li:list-disc
prose-li:leading-3
prose-ul:py-0
prose-ul:pb-4
prose-ol:py-0
prose-ol:pb-4
`;
