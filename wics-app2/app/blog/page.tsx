import { client } from "@/sanity/lib/client";
import Header from "@/app/components/Header";
import PostComponent from "@/app/components/blog/BlogPostComponent";

async function getPosts() {
  const query = `
    *[_type == "blogPost"] | order(publishedAt desc) {
        title,
        slug,
        author,
        publishedAt,
        excerpt,
        "featureImage": coalesce(featureImage.asset->url, body[_type == "image"][0].asset->url),
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
      <Header title="Written by WiCS" />
      <div>
        {posts?.length > 0 &&
          posts?.map((post) => <PostComponent key={post?._id} post={post} />)}
      </div>
    </div>
  );
}
