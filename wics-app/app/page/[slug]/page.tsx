import Header from "@/app/components/Header";
import React from "react";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { RichTextComponents } from "@/app/components/blog/RichTextComponents";
import ImageCarousel from "@/app/components/carousels/ImageCarousel";
import { getSlugsByType } from "@/app/lib/staticParams";
import PaginatedPosts from "@/app/components/PaginatedPosts";

export const dynamic = "force-static";

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
      "logo": coalesce(sponsor->logo, logo) {
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
          url,
          metadata {
            lqip
          }
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
      excerpt,
      author,
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
      "tags": tags[]->{
        _id,
        slug {
          current
        },
        name
      },
      "headings": body[style in ["h1", "h2", "h3", "h4", "h5"]],
      body[] {
        ...,
        _type == "image" => {
          asset->{
            _id,
            url,
            metadata {
              lqip,
              dimensions
            }
          },
          alt
        },
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
          url,
          metadata {
            lqip,
            dimensions
          }
        },
        alt
      }
    }
  `;
  return await client.fetch(query);
}
export async function generateStaticParams() {
  const slugs = await getSlugsByType("pageBuilder");
  return slugs.map(({ slug }) => ({ slug }));
}

const page = async ({ params }: Params) => {
  const slug = params.slug;
  const page: Page = await getPage(params?.slug);
  const posts = await getPostsByTag(page?.tag?.slug?.current);
  const postsPerPage = 5;

  if (!page) {
    notFound();
  }

  return (
    <div className="container mx-auto px-5 pt-24 lg:px-32">
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

      <div className="lg:grid lg:grid-cols-2 lg:gap-6 xl:gap-20">
        <div className={richTextStyles}>
          <PortableText value={page?.blurb} components={RichTextComponents} />
        </div>

        <div className="py-3">
          <ImageCarousel images={page?.images} />
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-3xl px-3 sm:mt-24">
        <PaginatedPosts
          posts={posts}
          url={`page/${slug}`}
          postsPerPage={postsPerPage}
          mode="client"
        />
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
