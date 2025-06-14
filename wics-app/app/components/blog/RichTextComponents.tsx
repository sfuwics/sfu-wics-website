import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";
import { slugify } from "@/app/lib/helpers";

export const RichTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.url) {
        console.error("Missing image URL:", value);
        return <p className="italic text-gray-500">Image not available</p>;
      }

      const { width, height } = value?.dimensions || {};
      const aspectRatio = width && height ? width / height : 0;

      const shouldTakeFullWidth = aspectRatio >= 1;

      return (
        <div
          className={`relative mx-auto my-10 ${
            shouldTakeFullWidth ? "w-full" : "max-w-[400px]"
          }`}
        >
          <Image
            src={value.url}
            alt={value.alt || "Post image"}
            layout={shouldTakeFullWidth ? "responsive" : "intrinsic"}
            width={shouldTakeFullWidth ? width : 400}
            height={shouldTakeFullWidth ? height : 600}
            placeholder={value.lqip ? "blur" : "empty"}
            blurDataURL={value.lqip}
            className="motion-safe:animate-fadeIn mx-auto rounded-xl opacity-100 transition-opacity duration-700"
          />
        </div>
      );
    },
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
