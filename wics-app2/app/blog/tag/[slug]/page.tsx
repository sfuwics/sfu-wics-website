import Header from "@/app/components/blog/Header";
import PostComponent from "@/app/components/blog/PostComponent";
import { Post } from "@/app/utils/Interface";
import { client } from "@/sanity/lib/client";
import React from "react";

async function getPostsByTag(tag: string) {
  const query = `
    *[_type == "post" && references(*[_type == "tag" && slug.current == "${tag}"]._id)]{
      title,
      slug,
      author,
      publishedAt,
      excerpt,
      tags[]-> {
        _id,
        slug,
        name
      }
    }
  `;

  const posts = await client.fetch(query);
  return posts;
}

interface Params {
  params: {
    slug: string;
  };
}

const revalidate = 60;

const page = async ({ params }: Params) => {
  const posts: Array<Post> = await getPostsByTag(params.slug);
  return (
    <div className="mx-auto max-w-5xl px-6">
      <Header title={`#${params?.slug}`} tags />
      <div>
        {posts?.length > 0 &&
          posts?.map((post) => <PostComponent key={post?._id} post={post} />)}
      </div>
    </div>
  );
};

export default page
