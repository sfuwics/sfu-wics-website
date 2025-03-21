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
      className={`relative h-full w-full transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"} transform text-white transition-transform duration-300 hover:text-wics-blue-500`}
    >
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/60 to-transparent transition-opacity duration-300 hover:from-white/60" />
      <Image src={imageSrc} alt={text} fill className="object-cover" />
      <div className="max-w-2/3 absolute left-2 top-2 z-20 mx-2 my-2 text-xl lg:text-2xl xl:mx-4">
        {text}
      </div>
      {/* </div> */}
    </div>
  );
};

export default FeatureComponent;
