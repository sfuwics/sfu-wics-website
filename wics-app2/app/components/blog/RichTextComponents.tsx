import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { urlForImage } from "@/sanity/lib/image";
import { slugify } from "@/app/utils/helpers";

export const RichTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.url) {
        console.error("Missing image URL:", value);
        return <p className="text-gray-500 italic">Image not available</p>;
      }
    
      const { width, height } = value?.dimensions || {};
      const aspectRatio = width && height ? width / height : 0;
      console.log(aspectRatio);
    
      // Determine whether the image should take full width (aspect ratios like 3:4 should not take full width)
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
            className="mx-auto"
          />
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="ml-10 list-disc space-y-5 py-5">{children}</ul>
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
    // Handle normal blocks with newlines (`\n`)
    normal: ({ value }: any) => {
      return (
        <p className="mb-4">
          {value.children.map((child: any, index: number) => {
            const lines = child.text.split("\n");
            return lines.map((line: string, i: number) =>
              i === lines.length - 1 ? (
                line
              ) : (
                <>
                  {line}
                  <br />
                </>
              ),
            );
          })}
        </p>
      );
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
          className="text-wics-blue-100 underline hover:text-wics-yellow-500"
        >
          {children}
        </Link>
      );
    },
  },
};
