import Header from '@/app/components/Header';
import React from 'react';
import { client } from "@/sanity/lib/client";
import { Post } from '@/app/utils/Interface';
import Link from 'next/link';
import { PortableText } from 'next-sanity';
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from 'next/navigation';
import { slugify } from "@/app/utils/helpers";
import { RichTextComponents } from '@/app/components/RichTextComponents';

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
    body,
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

const page = async ({params}: Params) => {
  const post: Post = await getPost(params?.slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <Header title={post?.title} />
      <div className='text-center'>
        <span className='text-purple-500'>
          {new Date(post?.publishedAt).toDateString()}
        </span>
        <div className='mt-5'>
          {post?.tags?.map((tag) => (
            <Link key={tag?._id} href={`/tag/${tag.slug.current}`}>
              <span className='mr-2 p-1 rounded-sm text-sm lowercase border'>
                #{tag.name}
              </span>
            </Link>
          ))}
        </div>

        <div className={richTextStyles}>
          <PortableText 
            value={post?.body}
            components={RichTextComponents}
          />
        </div>
      </div>
    </div>
  );
};

export default page

const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <Image
        src={urlForImage(value).url()}
        alt="Post"
        width={700}
        height={700}
      />
    ),
  },
  block: {
    h1: ({ value }: any) => (
      <h1
        id={slugify(value.children[0].text)}
        className="text-4xl font-bold mb-3"
      >
        {value.children[0].text}
      </h1>
    ),
    h2: ({ value }: any) => (
      <h2
        id={slugify(value.children[0].text)}
        className="text-3xl font-bold mb-3"
      >
        {value.children[0].text}
      </h2>
    ),
    h3: ({ value }: any) => (
      <h3
        id={slugify(value.children[0].text)}
        className="text-2xl font-bold mb-3"
      >
        {value.children[0].text}
      </h3>
    ),
    h4: ({ value }: any) => (
      <h4
        id={slugify(value.children[0].text)}
        className="text-2xl font-bold mb-3"
      >
        {value.children[0].text}
      </h4>
    ),
    h5: ({ value }: any) => (
      <h5
        id={slugify(value.children[0].text)}
        className="text-2xl font-bold mb-3"
      >
        {value.children[0].text}
      </h5>
    ),
    h6: ({ value }: any) => (
      <h6
        id={slugify(value.children[0].text)}
        className="text-xl font-bold mb-3"
      >
        {value.children[0].text}
      </h6>
    ),
  },
};

const richTextStyles = `
mt-14
text-justify
max-w-2xl
m-auto
prose-headings:my-5
prose-heading:text-2xl
prose-p:mb-5
prose-p:leading-7
prose-li:list-disc
prose-li:leading-7
prose-li:ml-4
`
