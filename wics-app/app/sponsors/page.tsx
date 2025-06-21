import React from "react";
import Header from "@/app/components/Header";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";

async function getPlatinumSponsors() {
  const query = `
    *[_type == "sponsor" && tier == "platinum"] | order(orderRank) {
      _id,
      companyName,
      tier,
      "link": link.current,
      "logo": logo {
        asset-> {
          url,
          metadata {
            lqip
          }
        }
      }
    }
  `;

  const sponsors = await client.fetch(query);
  return sponsors;
}

async function getGoldSponsors() {
  const query = `
    *[_type == "sponsor" && tier == "gold"] | order(orderRank) {
      _id,
      companyName,
      tier,
      "link": link.current,
      "logo": logo {
        asset-> {
          url,
          metadata {
            lqip
          }
        }
      }
    }
  `;

  const sponsors = await client.fetch(query);
  return sponsors;
}

export default async function Sponsors() {
  const platinumSponsors = await getPlatinumSponsors();
  const goldSponsors = await getGoldSponsors();

  return (
    <div className="mx-auto max-w-7xl px-9 py-8 pt-24">
      <Header title="Sponsors" />

      <div className="md:pb-12 lg:w-2/3">
        <p className="text-sm sm:text-lg">
          SFU WiCS is a fully student-led organization, powered by our
          passionate executive team and dedicated volunteers. We are extremely
          grateful for the generous support of our sponsors, whose contributions
          enable us to create meaningful opportunities, promote diversity, and
          inspire the next generation of leaders in technology.
        </p>

        <p className="mt-4 text-sm sm:text-lg">
          If you or your organization would like to support our mission and
          become a sponsor, please contact us at{" "}
          <a
            href="mailto:wics@sfu.ca"
            className="text-wics-blue-500 underline hover:text-wics-yellow-500"
          >
            wics@sfu.ca
          </a>
        </p>
      </div>

      <p className="flex justify-center pb-12 pt-8 text-2xl font-bold md:text-3xl lg:text-4xl 2xl:pb-20 2xl:text-5xl">
        Platinum Sponsors
      </p>
      <div className="-mx-4 flex flex-wrap justify-center">
        {platinumSponsors.map((sponsor) => (
          <div
            key={sponsor._id}
            className={`flex w-full items-center px-4 pb-12 lg:pb-24 ${
              platinumSponsors.length % 2 !== 0 &&
              platinumSponsors.indexOf(sponsor) === platinumSponsors.length - 1
                ? "sm:w-full md:w-2/3"
                : "sm:w-1/2"
            } flex justify-center`}
          >
            <Link
              href={`/page/${sponsor.link || ""}`}
              className="group block w-full max-w-[200px] sm:max-w-[300px] lg:max-w-[380px] 2xl:max-w-[450px]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative">
                <div className="relative h-[100px] w-full sm:h-[130px] lg:h-[180px] 2xl:h-[220px]">
                  <Image
                    src={sponsor.logo.asset?.url}
                    alt={sponsor.companyName}
                    fill
                    className="motion-safe:animate-fadeIn object-contain opacity-100 transition-opacity duration-700"
                    quality={85}
                    sizes="(max-width: 1024px) 175px, (max-width: 1536px) 225px, 300px"
                    placeholder={
                      sponsor.logo.asset.metadata?.lqip ? "blur" : "empty"
                    }
                    blurDataURL={sponsor.logo.asset.metadata?.lqip}
                  />
                </div>
                <div className="mt-1 h-0.5 w-full overflow-hidden lg:h-1">
                  <div className="h-full w-full origin-left scale-x-0 bg-wics-yellow-500 transition-transform duration-300 group-hover:scale-x-100" />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <p className="flex justify-center pb-12 pt-8 text-2xl font-bold md:text-3xl lg:text-4xl 2xl:pb-20 2xl:text-5xl">
        Gold Sponsors
      </p>
      <div className="-mx-4 flex flex-wrap justify-center">
        {goldSponsors.map((sponsor, index) => (
          <div
            key={sponsor._id}
            className={`sm:pb-22 flex w-full items-center px-4 pb-12 sm:px-5 lg:pb-24 2xl:px-1 ${
              goldSponsors.length % 3 === 1 && index === goldSponsors.length - 1
                ? "sm:w-full" // Center last item if 1 extra
                : goldSponsors.length % 3 === 2 &&
                    index >= goldSponsors.length - 2
                  ? "sm:w-1/2 lg:w-1/3" // Handle 2 extra items
                  : "sm:w-1/3 md:w-1/3" // Default 3-column
            } flex justify-center`}
          >
            <Link
              href={`/page/${sponsor.link || ""}`}
              className="group block w-full max-w-[160px] sm:max-w-[270px] lg:max-w-[260px] 2xl:max-w-[300px]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative">
                <div className="relative h-[60px] w-full sm:h-[100px] lg:h-[120px] 2xl:h-[150px]">
                  <Image
                    src={sponsor.logo.asset?.url}
                    alt={sponsor.companyName}
                    fill
                    className="motion-safe:animate-fadeIn object-contain opacity-100 transition-opacity duration-700"
                    quality={85}
                    sizes="(max-width: 1024px) 175px, (max-width: 1536px) 225px, 300px"
                    placeholder={
                      sponsor.logo.asset.metadata?.lqip ? "blur" : "empty"
                    }
                    blurDataURL={sponsor.logo.asset.metadata?.lqip}
                  />
                </div>
                <div className="mt-1 h-0.5 w-full overflow-hidden lg:h-1">
                  <div className="h-full w-full origin-left scale-x-0 bg-wics-yellow-500 transition-transform duration-300 group-hover:scale-x-100" />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
