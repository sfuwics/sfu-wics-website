import { client } from "@/sanity/lib/client";
import Header from '@/app/components/blog/Header';
import PostComponent from "@/app/components/blog/PostComponent";

async function getPosts() {
  const query = `
    *[_type == "post"] | order(publishedAt desc) {
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
  const data = await client.fetch(query);
  return data;
}

export const revalidate = 60;

export default async function Blog() {
  const posts: Post[] = await getPosts();

  return (
    <div className="mx-auto max-w-3xl">
      <Header title="Blog Posts" />
      <div>
        {posts?.length > 0 &&
          posts?.map((post) => <PostComponent key={post?._id} post={post} />)}
      </div>
    </div>
  );
}
