import React from "react";
import Header from "@/app/components/Header";
import { client } from "@/sanity/lib/client";
import EventComponent from "@/app/components/EventComponent";
import ComponentCarousel from "../components/carousels/ComponentCarousel";
import Image from "next/image";
import FeatureComponent from "../components/FeatureComponent";
import EventTile from "../components/EventTile";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import TryCatchLogo from "@/app/public/images/events/trycatch-logo.png";
import GHCLogo from "@/app/public/images/events/ghc-logo.png";
import CANCWiCLogo from "@/app/public/images/events/can-cwic-logo.png";
import HackTheGalaxyPic from "@/app/public/images/events/hack-the-galaxy.jpg";
import PastEventsBg from "@/app/public/images/events/past-events-bg.svg";
import { createMetadata } from "@/app/lib/metadata";

export const metadata = createMetadata("Events");

async function getUpcomingEvents() {
  const query = `
    *[_type == "post" && isEvent == true && eventDate >= now()] 
      | order(eventDate asc) {
      _id,
      _type,
      title,
      eventDate,
      "headings": body[style in ["h1", "h2", "h3", "h4", "h5"]],
      body[] {
        ...,
        _type == "link" => {
          "href": @.href,
          "text": @.text
        },
        markDefs[] {
          ...,
          _type == "link" => {
            "href": @.href,
            "text": @.text
          }
        }
      },
      images[] {
        _key,
        asset->{
          _id,
          url,
          metadata {
            dimensions {
              width,
              height,
              aspectRatio
            },
            lqip
          }
        }
      },
      "featureImage": images[0].asset->url,
      "featureImageDimensions": images[0].asset->metadata.dimensions
    }
  `;
  return await client.fetch(query);
}

async function getEventRecapCount() {
  const query = `count(*[_type == "post" && isEventRecap == true])`;
  return await client.fetch(query);
}

export default async function Events() {
  const posts: Post[] = await getUpcomingEvents();
  const recapCount: number = await getEventRecapCount();

  return (
    <div className="container mx-auto px-5 pt-24">
      <Header title="Events" />

      <ComponentCarousel autoScroll scrollInterval={10000}>
        {posts?.map((post) => <EventComponent key={post?._id} post={post} />)}
      </ComponentCarousel>

      <div className="my-6 flex w-full flex-col gap-4 sm:grid sm:grid-cols-2 md:h-[400px] md:grid-cols-4 md:grid-rows-2 lg:h-[600px] lg:grid-cols-5 xl:h-[800px]">
        <div className="h-64 w-full overflow-hidden rounded-xl sm:col-span-2 md:row-span-2 md:h-full lg:col-span-3">
          <Link href="/events/past-events" className="block h-full">
            <div className="group relative h-full w-full bg-wics-blue-800">
              <Image
                src={PastEventsBg}
                alt=""
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />

              <div className="relative px-4 pt-4 xl:px-6">
                <span className="text-3xl font-semibold text-white group-hover:underline group-hover:decoration-wics-yellow-500 group-hover:decoration-4 sm:text-4xl lg:text-5xl">
                  Past Events
                  <FaArrowRight className="ml-3 inline h-[0.7em] w-[0.7em] align-baseline" />
                </span>
                {recapCount > 0 && (
                  <p className="mt-2 text-base text-wics-yellow-200 lg:text-lg">
                    {recapCount} event recaps
                  </p>
                )}
              </div>
            </div>
          </Link>
        </div>

        <div className="h-48 w-full overflow-hidden rounded-xl md:h-full">
          <Link
            href="https://trycatch.cs.sfu.ca/"
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
          >
            <EventTile
              logoSrc={TryCatchLogo}
              text="Try/CATCH"
              className="bg-wics-blue-800"
            />
          </Link>
        </div>

        <div className="h-48 w-full overflow-hidden rounded-xl md:h-full">
          <Link href="/page/hack-the-galaxy">
            <FeatureComponent
              imageSrc={HackTheGalaxyPic}
              text="Hack the Galaxy"
            />
          </Link>
        </div>

        <div className="h-48 w-full overflow-hidden rounded-xl md:h-full">
          <Link href="/page/ghc" className="block h-full">
            <EventTile
              logoSrc={GHCLogo}
              text="Grace Hopper Celebration"
              className="border border-neutral-300 bg-[#F4F1FF]"
              labelClassName="text-wics-blue-500"
            />
          </Link>
        </div>

        <div className="h-48 w-full overflow-hidden rounded-xl md:h-full">
          <Link href="/page/can-cwic" className="block h-full">
            <EventTile
              logoSrc={CANCWiCLogo}
              text="CAN-CWiC"
              className="border border-neutral-300 bg-[#F4F1FF]"
              labelClassName="text-wics-blue-500"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
