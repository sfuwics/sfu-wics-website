import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from 'next-sanity';
import { urlForImage } from "@/sanity/lib/image";
import { slugify } from "@/app/utils/helpers";

export const RichTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative w-full h-96 m-10 mx-auto">
          <Image
            src={urlForImage(value).url()}
            alt="Post"
            width={700}
            height={700}
          />
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="ml-10 py-5 list-disc space-y-5">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="mt-lg list-decimal ml-5 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="ml-5 list-item">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="ml-5 list-item">{children}</li>
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
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-[#24138E] border-l-4 pl-5 py-5 my-5">
        {children}
      </blockquote>
    ),
    // Handle normal blocks with newlines (`\n`)
    normal: ({ value }: any) => {
      return (
        <p className="mb-4">
          {value.children.map((child: any, index: number) => {
            const lines = child.text.split('\n');
            return lines.map((line: string, i: number) => (
              i === lines.length - 1 
                ? line 
                : <>
                    {line}
                    <br />
                  </>
            ));
          })}
        </p>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/')
        ? 'noreferrer noopener'
        : undefined;

      return (
        <Link
          href={value.href}
          rel={rel}
          className="underline decoration-[#24138E] hover:decoration-[#FFAA46]"
        >
          {children}
        </Link>
      );
    },
  },
};
