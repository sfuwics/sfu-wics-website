"use client";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import small from "@/app/public/small.json";

export default function ResponsiveLottie() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const handleResize = async () => {
      if (window.innerWidth < 640) {
        const mobile = await import("@/app/public/small.json");
        setAnimationData(mobile.default);
      } 
      if (window.innerWidth < 1024) {
        const tablet = await import("@/app/public/mid.json");
        setAnimationData(tablet.default);
      } 
      if (window.innerWidth > 1024) {
        const desktop = await import("@/app/public/hero.json");
        setAnimationData(desktop.default);
      }
    };

    // Initialize & update on resize
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!animationData) return <div>Loading...</div>;

  return <Lottie animationData={animationData} loop autoplay />;
}