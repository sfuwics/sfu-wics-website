import Link from "next/link";
import React from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "@/app/components/blog/RichTextComponents";

interface Props {
  posts: Post[];
}

const PostComponent = ({ post }: Props) => {
  return (
<div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-5 lg:gap-10">
  {/* Title and Body */}
  <div className="sm:w-2/3 order-2 sm:order-1">
    <h2 className="text-base py-2 sm:text-xl font-medium">{post?.title}</h2>
    <div className={richTextStyles}>
      <PortableText value={post?.body} components={RichTextComponents} />
    </div>
  </div>

  {/* Image */}
  {post?.featureImage && (
    <div className="flex sm:w-1/3 justify-center order-1 sm:order-2">
      <div className="rounded-xl overflow-hidden">
        <Image
          src={post.featureImage}
          alt={post?.title || "Post Image"}
          width={800}
          height={400}
          className="h-auto w-full object-contain lg:max-h-[350px]"
          style={{
            aspectRatio: post?.featureImageDimensions?.aspectRatio || 16 / 9, // Fallback to 16:9
          }}
          priority
        />
      </div>
    </div>
  )}
</div>
  );
};

export default PostComponent;

const richTextStyles = `
text-left
text-sm

m-auto
prose-headings:my-3
prose-heading:text-2xl
prose-p:mb-[2%]
sm:prose-p:mb-4
sm:prose-p:leading-6
prose-li:list-disc
prose-li:leading-3
prose-ul:py-0
prose-ul:pb-4
prose-ol:py-0
prose-ol:pb-4
`;
