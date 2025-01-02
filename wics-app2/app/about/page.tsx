import { client } from "@/sanity/lib/client";
import Header from "@/app/components/blog/Header";
import PostComponent from "@/app/components/blog/PostComponent";
import WiCSGroupPhoto from "@/app/public/images/about/wics-group-photo.png";
import Image from "next/image";

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

export default async function About() {
  
  return (
    <div className="mx-auto max-w-7xl">
      <Header title="Get to Know SFU WiCS" />

      <div>
        <div>
          <Image
            src={WiCSGroupPhoto}
            alt="Group photo at WiCS 20th Aniversary"
            className="rounded-2xl"
          />
        </div>

        <p className="pt-5 text-3xl">
          Established in 2003,{" "}
          <span className="text-4xl font-bold text-wics-blue-500">
            SFU Women in Computing Science (SFU WiCS)
          </span>{" "}
          is a student-led society at SFU dedicated to empowering women in tech.
          We provide a supportive community where members can connect, grow, and
          thrive in computing science. Our mission is to{" "}
          <span className="text-4xl font-bold text-wics-blue-500">promote</span>{" "}
          our community,{" "}
          <span className="text-4xl font-bold text-wics-blue-500">build</span>{" "}
          lasting connections,{" "}
          <span className="text-4xl font-bold text-wics-blue-500">support</span>{" "}
          academic and professional journeys, and{" "}
          <span className="text-4xl font-bold text-wics-blue-500">challenge</span>{" "}
          biases to create a more equitable and inclusive tech world.
        </p>
      </div>

      <div className="mt-20">
        <Header title="Core Executive Profiles" />

      </div>
    </div>
  );
}
