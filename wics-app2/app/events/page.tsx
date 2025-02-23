import React from 'react'
import Header from "@/app/components/Header";
import { client } from "@/sanity/lib/client";
import EventComponent from "@/app/components/EventComponent";
import ComponentCarousel from '../components/carousels/ComponentCarousel';
import EventsCarousel from '../components/carousels/EventsCarousel';

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
          url
        },
        alt
      },
      "featureImage": images[0].asset->url,
    }
  `;
  return await client.fetch(query);
}

export const revalidate = 60;

export default async function Events() {
  const posts: Post[] = await getUpcomingEvents();
  return (
    <div className="mx-auto">
      <Header title="Events" />

      <ComponentCarousel autoScroll scrollInterval={10000} >
        {posts?.map((post) => <EventComponent key={post?._id} post={post} />)}
      </ComponentCarousel> 
        
    </div>
  );
};


