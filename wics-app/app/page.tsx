import Image from "next/image";
import PSBCCard from "./components/PSBCCard";
import pCosmos from "@/app/public/images/home/p-cosmos.png";
import sCosmos from "@/app/public/images/home/s-cosmos.png";
import bCosmos from "@/app/public/images/home/b-cosmos.png";
import cCosmos from "@/app/public/images/home/c-cosmos.png";
import PSBCCarousel from "./components/PSBCCarousel";
import MedWiCSLogo from "@/app/public/wics-logos/blue_coloured_medium.png";
import FeatureComponent from "./components/FeatureComponent";
import Link from "next/link";
import Skate from "@/app/public/images/home/iceskate.png";
import News from "@/app/public/images/home/news.png";
import Blog from "@/app/public/images/home/blog.png";
import LottieAnimation from "./components/LottieAnimation";

export default function Home() {
  return (
    <div>
      {/* The hero text lives inside the Lottie animation */}
      <h1 className="sr-only">SFU Women in Computing Science</h1>
      <div className="pb-24 sm:pb-24">
        <LottieAnimation />
      </div>

      <div className="container mx-auto px-5 xl:px-16">
        <div className="flex flex-col sm:gap-8">
          <p className="text-center text-3xl text-wics-blue-500 md:text-3xl lg:text-4xl 2xl:text-5xl">
            Our goals are to:
          </p>
          <div className="block sm:hidden">
            <PSBCCarousel />
          </div>
          <div className="hidden sm:block">
            <div className="flex justify-between gap-2 md:gap-6">
              <PSBCCard
                imageSrc={pCosmos}
                title="Promote"
                description="women in Computing Science"
              />
              <PSBCCard
                imageSrc={sCosmos}
                title="Support"
                description="women throughout their study of Computing Science"
              />
              <PSBCCard
                imageSrc={bCosmos}
                title="Build"
                description="a strong network of friendly faces for women in Computing Science"
              />
              <PSBCCard
                imageSrc={cCosmos}
                title="Challenge"
                description="the biases and myths faced by women in Computing Science"
              />
            </div>
          </div>
        </div>

        <div className="py-20 md:py-28 lg:py-36 xl:py-40 2xl:py-48">
          <div className="mb-4 flex items-start justify-start gap-3 md:gap-5 2xl:gap-8">
            <p className="text-4xl font-bold text-wics-blue-500 md:text-5xl 2xl:text-7xl">
              Explore
            </p>
            <Image
              src={MedWiCSLogo}
              alt="WiCS Logo"
              className="h-[40px] w-auto object-contain md:h-[52px] 2xl:h-[80px]"
              quality={85}
            />
          </div>

          <div className="flex w-full flex-col gap-4 sm:h-[400px] sm:flex-row md:h-[510px] lg:h-[610px] 2xl:h-[800px]">
            <div className="h-48 w-full overflow-hidden rounded-xl sm:h-full sm:w-7/12">
              <Link href="/events" className="block h-full">
                <FeatureComponent
                  imageSrc={Skate}
                  text="Check Out Our Events"
                  gradientClassName="h-2/3 from-black/70 via-black/55 via-40% sm:h-1/2"
                />
              </Link>
            </div>

            <div className="flex flex-col gap-4 sm:flex-1">
              <div className="h-48 w-full overflow-hidden rounded-xl sm:h-auto sm:min-h-0 sm:flex-1">
                <Link href="/newsroom" className="block h-full">
                  <FeatureComponent imageSrc={News} text="Stay Updated" />
                </Link>
              </div>

              <div className="h-48 w-full overflow-hidden rounded-xl sm:h-auto sm:min-h-0 sm:flex-1">
                <Link href="/blog" className="block h-full">
                  <FeatureComponent imageSrc={Blog} text="Read Our Blog" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
