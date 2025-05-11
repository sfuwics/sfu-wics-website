"use client";

import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface FeatureComponentProps {
  imageSrc: string;
  text: string;
}

const FeatureComponent: React.FC<FeatureComponentProps> = ({
  imageSrc,
  text,
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
      <div className="absolute inset-0 z-20 h-2/3 bg-gradient-to-b from-black/75 via-transparent to-transparent" />
      <Image src={imageSrc} alt={text} fill className="object-cover" />
      <div className="max-w-2/3 absolute left-2 top-2 z-20 mx-2 my-2 text-xl lg:text-2xl xl:mx-4">
        <span className="text-white group-hover:underline group-hover:decoration-wics-yellow-500 group-hover:decoration-4">
          {text}
        </span>
      </div>
    </div>
  );
};

export default FeatureComponent;
