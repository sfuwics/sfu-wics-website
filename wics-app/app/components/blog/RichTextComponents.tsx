import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";
import { slugify } from "@/app/lib/helpers";
import VideoBlock from "../VideoBlock";

export const RichTextComponents = {
types: {
  image: ({ value }: any) => {
    // Handle missing/processing images
    if (!value?.asset?._ref || !value?.url) {
      return (
        <div className="my-10 rounded-lg bg-gray-100 p-8 text-center">
          <p className="text-gray-500">
            {value?._upload 
              ? "Image is still processing..." 
              : "Image not available"}
          </p>
        </div>
      );
    }

    const { width, height } = value.dimensions || {};
    const aspectRatio = width && height ? width / height : 16/9; // Default fallback

    return (
      <div className={`relative mx-auto my-6 sm:my-10 ${
        aspectRatio >= 1 ? "w-full" : "max-w-[400px]"
      }`}>
        <Image
          src={urlForImage(value).url()}
          alt={value.alt || "Post image"}
          width={aspectRatio >= 1 ? width : 400}
          height={aspectRatio >= 1 ? height : 400 / aspectRatio}
          placeholder={value.lqip ? "blur" : "empty"}
          blurDataURL={value.lqip}
          className="rounded-xl"
          style={{
            aspectRatio: aspectRatio,
            objectFit: 'contain'
          }}
        />
        {value.caption && (
          <p className="mt-2 text-center text-sm text-gray-600">
            {value.caption}
          </p>
        )}
      </div>
    );
  },
  video: VideoBlock,
},
  list: {
    bullet: ({ children }: any) => (
      <ul className="ml-10 list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="mt-lg ml-5 list-decimal space-y-2">{children}</ol>
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
        className="pt-3 text-4xl font-bold"
      >
        {value.children[0].text}
      </h1>
    ),
    h2: ({ value }: any) => (
      <h2
        id={slugify(value.children[0].text)}
        className="pt-3 text-3xl font-bold"
      >
        {value.children[0].text}
      </h2>
    ),
    h3: ({ value }: any) => (
      <h3
        id={slugify(value.children[0].text)}
        className="pt-3 text-2xl font-bold"
      >
        {value.children[0].text}
      </h3>
    ),
    h4: ({ value }: any) => (
      <h4
        id={slugify(value.children[0].text)}
        className="pt-3 text-xl font-bold"
      >
        {value.children[0].text}
      </h4>
    ),
    h5: ({ value }: any) => (
      <h5
        id={slugify(value.children[0].text)}
        className="pt-3 text-lg font-bold"
      >
        {value.children[0].text}
      </h5>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-5 border-l-4 border-l-[#24138E] py-5 pl-5">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => {
      return <p className="mb-5">{children}</p>;
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;

      return (
        <Link
          href={value.href}
          rel={rel}
          className="overflow-hidden break-words text-wics-blue-400 underline hover:text-wics-yellow-500"
          style={{ wordBreak: "break-word" }}
        >
          {children}
        </Link>
      );
    },
  },
};
