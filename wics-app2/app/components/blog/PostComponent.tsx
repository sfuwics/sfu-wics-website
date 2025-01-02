import Link from "next/link";
import React from "react";
import { Post } from "../../utils/Interface";

interface Props {
  posts: Post;
}

const PostComponent = ({ post }: Props) => {
  return (
    <div className={cardStyle}>
      <Link href={`blog/posts/${post?.slug?.current}`}>
        <h2 className="text-2xl font-medium">{post?.title}</h2>
        <p className="my-2 text-wics-blue-500">{post?.author}</p>
        <p className="my-2 text-wics-blue-500">
          {new Date(post?.publishedAt).toDateString()}
        </p>
        <p className="mb-4 line-clamp-2">{post?.excerpt}</p>
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
  );
};

export default PostComponent;

const cardStyle = `
mb-8
p-5
border
border-gray-900
rounded-xl
shadow-sm
shadow-wics-blue-500
hover:border-4
`;
