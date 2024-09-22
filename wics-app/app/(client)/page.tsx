import { client } from "@/sanity/lib/client"
import Header from "../components/Header";
import PostComponent from "../components/PostComponent";

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

export default async function Home() {
  const posts = await getPosts()
  console.log(posts, 'posts')

    return (
      <div>
        <Header title="Blog Posts" />
        <div>
          {posts?.length > 0 && posts?.map((post) => (
            <PostComponent key={post?._id} post={post} />
          ))}
        </div>
      </div>
    );
  }
  