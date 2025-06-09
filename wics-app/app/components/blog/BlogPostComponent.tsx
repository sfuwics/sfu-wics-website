import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Post } from "../../lib/Interface";

interface Props {
  posts: Post;
}

const PostComponent = ({ post }: Props) => {
  return (
    <div className="flex items-start gap-2 border-t border-black py-5 sm:gap-5 sm:py-8 lg:gap-10">
      <div className="w-2/3">
        <Link href={`/blog/posts/${post?.slug?.current}`}>
          <h2 className="text-2xl font-medium">{post?.title}</h2>
          <p className="mb-4 mt-2 line-clamp-2 text-sm sm:line-clamp-3">
            {post?.excerpt}
          </p>
          <p className="text-sm text-wics-blue-500">{post?.author}</p>
          <p className="pb-4 text-sm text-wics-blue-500">
            {new Date(post?.publishedAt).toDateString()}
          </p>
        </Link>

        {/* TAGS */}

        <div>
          {post?.tags?.map((tag) => (
            <Link key={tag?._id} href={`/blog/tag/${tag.slug.current}`}>
              <span className="mr-2 rounded-sm border p-1 text-sm lowercase">
                #{tag.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {post?.featureImage && (
        <div className="flex w-1/3 sm:max-h-[200px]">
          <Image
            src={post.featureImage.asset?.url}
            alt={post?.title || "Post Image"}
            height={400}
            width={800}
            placeholder={post.featureImage.asset?.metadata?.lqip  ? "blur" : "empty"}
            blurDataURL={post.featureImage.asset?.metadata?.lqip}
            className="h-auto max-h-full w-full rounded-xl object-cover transition-opacity duration-700 opacity-100 motion-safe:animate-fadeIn"
            priority
          />
        </div>
      )}
    </div>
  );
};

export default PostComponent;
