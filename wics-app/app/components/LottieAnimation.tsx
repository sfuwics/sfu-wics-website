"use client";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";

export default function ResponsiveLottie() {
  const [animationData, setAnimationData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        let data;
        if (isMobile) {
          data = await import("@/app/public/small.json");
        } else if (isTablet) {
          data = await import("@/app/public/mid.json");
        } else {
          data = await import("@/app/public/hero.json");
        }
        setAnimationData(data.default);
      } catch (error) {
        console.error("Failed to load animation:", error);
      }
    };

    if (isMobile !== null) loadAnimation();
  }, [isMobile, isTablet]);

  if (!animationData) {
    return (
      <div className="w-full flex items-center justify-center h-64 bg-white/80">
        <p className="text-gray-500 text-lg">
          Welcome to SFU WiCS :)
        </p>
      </div>
    );
  }

  // 4. Render animation
  return (
    <div className="w-full">
      <Lottie 
        animationData={animationData} 
        loop={true} 
        autoplay={true}
        className="w-full h-auto"
      />
    </div>
  );
}