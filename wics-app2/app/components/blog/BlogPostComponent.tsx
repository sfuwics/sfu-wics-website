import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Post } from "../../utils/Interface";

interface Props {
  posts: Post;
}

const PostComponent = ({ post }: Props) => {
  return (
    <div className="border-t border-black py-5 sm:py-8 flex gap-1 sm:gap-5 lg:gap-10 items-start">
      <div className="w-2/3 ">
        <Link href={`/blog/posts/${post?.slug?.current}`}>
          <h2 className="text-2xl font-medium">{post?.title}</h2>
          <p className="mb-4 line-clamp-2 sm:line-clamp-3 text-sm mt-2">{post?.excerpt}</p>
          <p className=" text-wics-blue-500 text-sm">{post?.author}</p>
          <p className="pb-4 text-wics-blue-500 text-sm">
            {new Date(post?.publishedAt).toDateString()}
          </p>
          
        </Link>

        {/* TAGS */}

        <div>
          {post?.tags?.map((tag) => (
            <span
              key={tag?._id}
              className="mr-2 rounded-sm border p-1 text-sm lowercase"
            >
              #{tag?.name}
            </span>
          ))}
        </div>
      </div>

      {post?.featureImage && (
        <div className="w-1/3 flex sm:max-h-[200px]">
          <Image
            src={post.featureImage}
            alt={post?.title || "Post Image"}
            width={800}
            height={400}
            className="rounded-xl object-cover w-full h-auto max-h-full"
            priority
          />
        </div>
    )}

    </div>
  );
};

export default PostComponent;