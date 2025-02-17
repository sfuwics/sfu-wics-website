import CloudCosmos from "@/app/public/images/home/cloud-cosmos.png";
import Image from "next/image";
import PSBCCard from "./components/PSBCCard";
import pCosmos from "@/app/public/images/home/p-cosmos.png";
import sCosmos from "@/app/public/images/home/s-cosmos.png";
import bCosmos from "@/app/public/images/home/b-cosmos.png";
import cCosmos from "@/app/public/images/home/c-cosmos.png";
import PSBCCarousel from "./components/PSBCCarousel";

export default function Home() {
  return (
    <div className="xl:px-16">
      {/* Hero */}
      <div className="flex flex-col sm:flex-row-reverse sm:items-center pb-12 md:pb-24">
        <div className="max-h-[500px] sm:flex-1">
          <Image
            src={CloudCosmos}
            width={1649}
            height={1104}
            alt="Cosmos on a Cloud"
            className="h-auto max-h-[500px] w-full object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
          />
        </div>
        <div className="sm:flex-1 sm:align-baseline">
          <p className="text-2xl text-wics-blue-500 sm:text-3xl 2xl:text-5xl">
            We are
          </p>
          <p className="text-4xl font-bold text-wics-blue-500 sm:text-4xl md:text-5xl 2xl:text-7xl">
            SFU Women in Computing Science
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:gap-8">
        <p className="text-center text-3xl md:text-3xl lg:text-4xl 2xl:text-5xl  text-wics-blue-500">
          Our goals are to:
        </p>
        <div className="block sm:hidden">
          <PSBCCarousel />
        </div>
        <div className="block flex hidden items-center sm:block">
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
    </div>
  );
}
