import React from "react";
import Image, { StaticImageData } from "next/image";

type CardProps = {
  imageSrc: string | StaticImageData;
  title: string;
  description: string;
};

const PSBCCard = ({ imageSrc, title, description }: CardProps) => {
  return (
    <div className="flex flex-col items-center gap-2 md:w-1/4 md:px-2">
      <div>
        <Image src={imageSrc} alt="" width={450} height={450} />
      </div>

      <div className="flex flex-col justify-center text-center">
        <p className="text-3xl sm:text-lg lg:text-3xl 2xl:text-4xl">{title}</p>
        <p className="mt-2 text-xl sm:mt-0 sm:text-sm lg:mt-2 lg:text-xl 2xl:text-2xl">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PSBCCard;
