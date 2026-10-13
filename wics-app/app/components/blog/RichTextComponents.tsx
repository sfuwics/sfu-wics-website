import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";
import { slugify } from "@/app/lib/helpers";
import VideoBlock from "../VideoBlock";

// Plain text of a block across all its spans (for heading ids)
const blockText = (value: any) =>
  (value?.children ?? []).map((child: any) => child?.text ?? "").join("");

const listIndent = (value: any) =>
  (value?.level ?? 1) > 1 ? "pl-4 sm:pl-8" : "pl-5 sm:pl-[4.75rem]";

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
      <div className={`relative mx-auto pb-2 pt-2 ${
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
  video: ({ value }: any) => {
  if (!value) return null;
  
  const isPortrait = value.orientation === 'portrait' || 
                    (value.dimensions?.width && value.dimensions?.height && 
                      value.dimensions.width < value.dimensions.height);

  return (
    <div className={`relative mx-auto pb-2 pt-2 ${
      isPortrait ? "max-w-[350px]" : "w-full"
    }`}>
      <VideoBlock value={value} />
    </div>
  );
}
},
  list: {
    // Only the top level gets the large indent; nested levels add a small
    // one so deep nesting doesn't push text off narrow screens
    bullet: ({ children, value }: any) => (
      <ul
        className={`${listIndent(value)} list-disc space-y-1 sm:space-y-2`}
      >
        {children}
      </ul>
    ),
    number: ({ children, value }: any) => (
      <ol
        className={`${listIndent(value)} list-decimal space-y-1 sm:space-y-2`}
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="list-item">{children}</li>,
    number: ({ children }: any) => <li className="list-item">{children}</li>,
  },
  block: {
    h1: ({ children, value }: any) => (
      <h1
        id={slugify(blockText(value))}
        className="pt-3 sm:pt-8 text-4xl font-bold"
      >
        {children}
      </h1>
    ),
    h2: ({ children, value }: any) => (
      <h2
        id={slugify(blockText(value))}
        className="pt-3 sm:pt-8 text-3xl font-bold"
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }: any) => (
      <h3
        id={slugify(blockText(value))}
        className="pt-3 sm:pt-8 text-2xl font-bold"
      >
        {children}
      </h3>
    ),
    h4: ({ children, value }: any) => (
      <h4
        id={slugify(blockText(value))}
        className="pt-3 sm:pt-8 text-xl font-bold"
      >
        {children}
      </h4>
    ),
    h5: ({ children, value }: any) => (
      <h5
        id={slugify(blockText(value))}
        className="pt-3 sm:pt-8 text-lg font-bold"
      >
        {children}
      </h5>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-5 border-l-4 border-l-[#24138E] py-5 pl-5">
        {children}
      </blockquote>
    ),
normal: ({ children, value }: any) => {
  // Count how many text nodes this block has
  const textNodeCount = value.children.filter((child: any) => 
    child._type === 'span' && child.text.trim().length > 0
  ).length;
  
  // Consider it single-line if there's only one text node
  const isSingleLine = textNodeCount === 1;
  
  return (
    <p className={isSingleLine ? "my-3" : "my-8"}>
      {children}
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
          className="overflow-hidden break-words text-wics-blue-400 underline hover:decoration-wics-yellow-500 hover:decoration-2"
          style={{ wordBreak: "break-word" }}
        >
          {children}
        </Link>
      );
    },
  },
};
