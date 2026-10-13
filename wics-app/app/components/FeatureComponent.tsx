"use client";

import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface FeatureComponentProps {
  imageSrc: string;
  text: string;
  // Height and stops of the dark overlay behind the label
  gradientClassName?: string;
}

const FeatureComponent: React.FC<FeatureComponentProps> = ({
  imageSrc,
  text,
  gradientClassName = "h-2/3 from-black/80 via-black/40",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`group relative h-full w-full transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className={`absolute inset-0 z-20 bg-gradient-to-b to-transparent ${gradientClassName}`} />
      <Image src={imageSrc} alt={text} fill className="object-cover" />
      <div className="absolute left-2 top-2 z-20 mx-2 my-2 max-w-[66%] text-xl lg:text-2xl xl:mx-4">
        <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:underline group-hover:decoration-wics-yellow-500 group-hover:decoration-4">
          {text}
        </span>
      </div>
    </div>
  );
};

export default FeatureComponent;
