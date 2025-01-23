import { client } from "@/sanity/lib/client";
import Header from "@/app/components/blog/Header";
import WiCSGroupPhoto from "@/app/public/images/about/wics-group-photo.png";
import Image from "next/image";
import ProfileCard from "../components/ProfileCard";
import ProfileCardSmall from "../components/ProfileCardSmall";
import ProfileGrid from "../components/ProfileGrid";

import PastExecAccordion from "../components/PastExecAccordion";
import Button from "../components/Button";


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

async function getPastExecList() {
  const query = `
    *[_type == "personList"] | order(title desc) {
      title,
      "imageUrl": image.asset->url,
      people[] {
        role,
        name,
      }
    }
  `;
  const data = await client.fetch(query);
  return data;
}

export const revalidate = 60;

export default async function About() {
  const profiles: Profile[] = await getProfiles();
  const execLists: PersonList[] = await getPastExecList();

  return (
    // <div className="mx-auto max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
    <div className="mx-auto">
      <Header title="Get to Know SFU WiCS" />

      <div>
        <div>
          <Image
            src={WiCSGroupPhoto}
            alt="Group photo at WiCS 20th Aniversary"
            className="rounded-2xl"
          />
        </div>

        <p className="pt-5 text-lg sm:text-xl md:text-2xl lg:text-3xl">
          Established in 2003,{" "}
          <span className={boldBlueHighlightText}>
            SFU Women in Computing Science (SFU WiCS)
          </span>{" "}
          is a student-led society at SFU dedicated to empowering women in tech.
          We provide a supportive community where members can connect, grow, and
          thrive in computing science. Our mission is to{" "}
          <span className={boldBlueHighlightText}>promote</span> our community,{" "}
          <span className={boldBlueHighlightText}>build</span> lasting
          connections, <span className={boldBlueHighlightText}>support</span>{" "}
          academic and professional journeys, and{" "}
          <span className={boldBlueHighlightText}>challenge</span> biases to
          create a more equitable and inclusive tech world.
        </p>
      </div>

      <div className="mt-20">
        <Header title="Core Executive Profiles" />
        <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {profiles?.length > 0 &&
            profiles?.map((profile) => (
              <ProfileCard key={profile?._id} profile={profile} />
            ))}
        </div>
      </div>


      
      
      {/* <Dropdown id="1" title="hi" content="higggggg"/> */}

      <div className="mt-10 pb-14">
        <Header title="Past Executives" />
        <PastExecAccordion data={execLists} />

      </div>
    </div>
  );
}

const boldBlueHighlightText = `
text-xl
sm:text-2xl
md:text-3xl
lg:text-4xl
font-bold
text-wics-blue-500
`;
