import React from "react";
import Image, { StaticImageData } from "next/image";

interface EventTileProps {
  logoSrc: StaticImageData;
  text: string;
  // Background, border, etc. for the tile
  className?: string;
  labelClassName?: string;
}

const EventTile: React.FC<EventTileProps> = ({
  logoSrc,
  text,
  className = "",
  labelClassName = "text-white",
}) => {
  return (
    <div
      className={`group flex h-full w-full flex-col rounded-xl ${className}`}
    >
      <div className="mx-4 mt-4 text-xl lg:text-2xl xl:mx-6">
        <span
          className={`${labelClassName} group-hover:underline group-hover:decoration-wics-yellow-500 group-hover:decoration-4`}
        >
          {text}
        </span>
      </div>
      {/* Logo fills the space under the label so the two never overlap */}
      <div className="relative mx-auto mb-4 mt-4 min-h-0 w-[65%] flex-1 lg:mb-8">
        <Image
          src={logoSrc}
          alt={`${text} logo`}
          fill
          sizes="(min-width: 768px) 17vw, 65vw"
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default EventTile;
