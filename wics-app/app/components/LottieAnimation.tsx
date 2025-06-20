"use client";
import Lottie from "lottie-react";
import mobileAnimation from "@/app/public/small.json";
import tabletAnimation from "@/app/public/mid.json";
import desktopAnimation from "@/app/public/hero.json";

export default function ResponsiveLottie() {
  return (
    <div className="w-full">
      <div className="block md:hidden">
        <Lottie animationData={mobileAnimation} loop autoplay />
      </div>

      <div className="hidden md:block lg:hidden">
        <Lottie animationData={tabletAnimation} loop autoplay />
      </div>

      <div className="hidden lg:block">
        <Lottie animationData={desktopAnimation} loop autoplay />
      </div>
    </div>
  );
}