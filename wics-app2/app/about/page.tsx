import { client } from "@/sanity/lib/client";
import Header from "@/app/components/blog/Header";
import PostComponent from "@/app/components/blog/PostComponent";
import WiCSGroupPhoto from "@/app/public/images/about/wics-group-photo.png";
import Image from "next/image";
import ProfileCard from "../components/ProfileCard";

async function getProfiles() {
  const query = `
    *[_type == "profile"] | order(orderRank)  {
        name,
        role,
        pronouns,
        blurb,
        linkedin,
        mainImage {
            asset->{
              _id,
              url
            },
            alt
        }
    }
  `;
  const data = await client.fetch(query);
  return data;
}

export const revalidate = 60;

export default async function About() {
  const profiles: Profile[] = await getProfiles();

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
          <span className="text-4xl font-bold text-wics-blue-500">
            challenge
          </span>{" "}
          biases to create a more equitable and inclusive tech world.
        </p>
      </div>

      <div className="mt-20">
        <Header title="Core Executive Profiles" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
        {profiles?.length > 0 &&
            profiles?.map((profile) => (
              <ProfileCard key={profile?._id} profile={profile} />
            ))}
        </div>
      </div>
    </div>
  );
}
