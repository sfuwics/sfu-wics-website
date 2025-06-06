import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Post } from "../../utils/Interface";
import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "@/app/components/blog/RichTextComponents";
import ImageCarousel from "@/app/components/carousels/ImageCarousel";

interface Props {
  posts: Post;
}

const PostComponent = ({ post }: Props) => {
  
  return (
    <div className="border-t border-black py-5 sm:py-8 flex gap-1 sm:gap-5 lg:gap-10 items-start">
      <div>
          <h2 className="text-2xl font-medium">{post?.title}</h2>
          <p className="pb-4 text-wics-blue-500 text-sm">
            {new Date(post?.publishedAt).toDateString()}
          </p>

          <div className={richTextStyles}>
            <PortableText value={post?.body}  components={RichTextComponents} />
          </div>

          <div className="sm:w-2/3">
            <ImageCarousel images={post?.images} autoScroll={false}/>
          </div>

      </div>

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
prose-p:mb-4
prose-p:leading-6
prose-li:list-disc
prose-li:leading-snug
prose-ul:py-0
prose-ul:pb-4
prose-ol:py-0
prose-ol:pb-4
`;
