import React from "react";
import Header from "@/app/components/Header";
import { client } from "@/sanity/lib/client";
import EventComponent from "@/app/components/EventComponent";
import ComponentCarousel from "../components/carousels/ComponentCarousel";
import Image from "next/image";
import FeatureComponent from "../components/FeatureComponent";
import Link from "next/link";
import TryCatchPic from "@/app/public/images/events/trycatch.png";
import GHCPic from "@/app/public/images/events/ghc.png";
import CANCWiCPic from "@/app/public/images/events/canc-wic.jpg";
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

async function getRecentEventRecapPic() {
  const query = `
    *[_type == "post" && isEventRecap == true && count(images) > 0] 
      | order(eventDate asc) {
      "featureImage": images[0].asset->url,
      "featureImageDimensions": images[0].asset->metadata.dimensions
    }
  `;
  return await client.fetch(query);
}

export default async function Events() {
  const posts: Post[] = await getUpcomingEvents();
  const eventRecapPic = await getRecentEventRecapPic();
  const firstEventRecap = eventRecapPic[0];

  return (
    <div className="container mx-auto px-5 pt-24">
      <Header title="Events" />

      <ComponentCarousel autoScroll scrollInterval={10000}>
        {posts?.map((post) => <EventComponent key={post?._id} post={post} />)}
      </ComponentCarousel>

      <div className="sm-grid-rows-3 my-6 flex w-full flex-col gap-4 sm:grid sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2 lg:grid-cols-5 xl:grid-rows-4">
        <div className="h-48 w-full overflow-hidden rounded-xl sm:col-span-2 sm:h-64 md:col-span-2 md:row-span-2 md:h-auto lg:col-span-3 lg:h-[600px] xl:row-span-4 xl:h-[800px]">
          <Link href="/events/past-events">
            <FeatureComponent
              imageSrc={firstEventRecap.featureImage}
              text="Check Out Our Past Events"
            />
          </Link>
        </div>

        <div className="h-48 w-full overflow-hidden rounded-xl sm:col-span-2 md:col-span-2 md:col-start-3 md:row-start-1 lg:col-start-4 lg:h-full xl:row-span-2">
          <Link
            href="https://trycatch.cs.sfu.ca/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FeatureComponent imageSrc={TryCatchPic} text="Try/CATCH" />
          </Link>
        </div>

        <div className="h-48 w-full overflow-hidden rounded-xl sm:row-start-3 md:col-start-3 md:row-start-2 lg:col-start-4 lg:h-full xl:row-span-2 xl:row-start-3">
          <Link href="/page/ghc">
            <FeatureComponent
              imageSrc={GHCPic}
              text="Grace Hopper Celebration"
            />
          </Link>
        </div>

        <div className="h-48 w-full overflow-hidden rounded-xl sm:row-start-3 md:col-start-4 md:row-start-2 lg:col-start-5 lg:h-full xl:row-span-2 xl:row-start-3">
          <Link href="/page/can-cwic">
            <FeatureComponent imageSrc={CANCWiCPic} text="CAN-CWiC" />
          </Link>
        </div>
      </div>
    </div>
  );
}
