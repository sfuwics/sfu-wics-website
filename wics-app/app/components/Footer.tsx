import Link from "next/link";
import React from "react";
import WiCSLogo from "@/app/public/wics-logos/blue_coloured_full.png";
import Image from "next/image";
import Stars from "@/app/public/images/footer/stars.png";

const Footer = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <Image
        src={Stars}
        alt="Decorative stars"
        className="top-1/5 pointer-events-none absolute bottom-[-4%] right-[-6%] w-56 object-contain sm:bottom-[-16%] sm:right-[-4%] sm:w-44 md:w-56 lg:bottom-[-6%] lg:right-[-2%]"
        width={150}
        height={150}
        quality={100}
      />

      <div className="relative flex flex-col gap-10 py-10 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-10 sm:py-16 md:px-20 xl:px-36">
        <div className="flex flex-col items-center gap-4 px-16 sm:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 sm:items-start sm:self-start sm:p-0">
          <Link href="/">
            <Image
              src={WiCSLogo}
              alt="WiCS Logo"
              width={170}
              height={60}
              className="object-contain"
              quality={85}
              priority
            />
          </Link>

          <p className="text-center text-sm sm:text-left md:pr-8">
            WiCS Website Designed and Developed by Gahee Kim
          </p>
        </div>

        <div className="flex flex-col gap-6 px-4 pb-10 sm:flex-row sm:gap-10 sm:p-0 md:gap-20 lg:gap-32">
          <div className="flex flex-col gap-2">
            <p className="text-wics-blue-500 sm:text-xl">Get in Touch</p>
            <Link
              href="mailto:wics@sfu.ca"
              className="decoration-wics-yellow-500 decoration-2 hover:underline"
            >
              <p className="text-sm sm:text-base">wics@sfu.ca</p>
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-wics-blue-500 sm:text-xl">Engage with Us</p>
            <Link
              href="https://discord.gg/8D2H5pAsTV"
              className="decoration-wics-yellow-500 decoration-2 hover:underline"
            >
              <p className="text-sm sm:text-base">Discord Community</p>
            </Link>

            <Link
              href="https://www.instagram.com/sfuwics/"
              className="decoration-wics-yellow-500 decoration-2 hover:underline"
            >
              <p className="text-sm sm:text-base">Instagram</p>
            </Link>

            <Link
              href="https://www.linkedin.com/company/sfu-wics/"
              className="decoration-wics-yellow-500 decoration-2 hover:underline"
            >
              <p className="text-sm sm:text-base">LinkedIn</p>
            </Link>

            <Link
              href="https://linktr.ee/SFUWiCS"
              className="decoration-wics-yellow-500 decoration-2 hover:underline"
            >
              <p className="text-sm sm:text-base">LinkTree</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
