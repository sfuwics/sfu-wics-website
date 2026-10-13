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
            <div className="group relative h-full w-full bg-gradient-to-br from-wics-blue-700 to-wics-blue-900">
              {/* Star field */}
              <svg aria-hidden="true" className="absolute inset-0 h-full w-full">
                <defs>
                  <pattern
                    id="past-events-stars"
                    width="56"
                    height="56"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="8" cy="10" r="1.2" fill="#fff" fillOpacity="0.35" />
                    <circle cx="36" cy="24" r="0.8" fill="#fff" fillOpacity="0.25" />
                    <circle cx="20" cy="46" r="1" fill="#fff" fillOpacity="0.3" />
                    <circle cx="50" cy="50" r="0.6" fill="#fff" fillOpacity="0.2" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#past-events-stars)" />
              </svg>
              {[
                "right-[12%] top-[20%] h-6 w-6 lg:h-10 lg:w-10",
                "bottom-[18%] left-[10%] h-4 w-4 lg:h-6 lg:w-6",
                "bottom-[28%] right-[26%] h-5 w-5 opacity-70 lg:h-8 lg:w-8",
              ].map((position) => (
                <svg
                  key={position}
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className={`absolute fill-wics-yellow-500 ${position}`}
                >
                  <path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z" />
                </svg>
              ))}

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
