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
    <div className={`relative w-full h-full transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"} text-white hover:text-wics-blue-500 transform transition-transform duration-300`}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/100 hover:from-white/70 to-transparent z-20 transition-opacity duration-300" /> 
      <Image src={imageSrc} alt={text} fill className="object-cover" />
        <div className="absolute top-2 left-2 mx-2 my-2 xl:mx-4 text-xl lg:text-2xl max-w-2/3 z-20">
          {text}
        </div>
      {/* </div> */}
    </div>

    
  );
};

export default FeatureComponent;
