import CloudCosmos from "@/app/public/images/home/cloud-cosmos.png";
import Image from "next/image";

export default function Home() {

  return (
    <div className="xl:px-16">

      {/* Hero */}
      <div className="flex flex-col sm:flex-row-reverse sm:items-center ">
        <div className="sm:flex-1 max-h-[500px]">
          <Image
            src={CloudCosmos}
            width={664}
            height={504}
            alt="Cosmos on a Cloud"
            className="w-full h-auto max-h-[500px] object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
          />
        </div>
        <div className="sm:flex-1 sm:align-baseline">
          <p className=" text-2xl sm:text-3xl 2xl:text-5xl text-wics-blue-500">We are</p>
          <p className="text-4xl sm:text-4xl md:text-5xl 2xl:text-7xl font-bold text-wics-blue-500">SFU Women in Computing Science</p>
        </div>
      </div>

      



    </div>
  );
}
