'use client';

import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import ClassNames from 'embla-carousel-class-names';
import PSBCCard from './PSBCCard';
import pCosmos from "@/app/public/images/home/p-cosmos.png";
import sCosmos from "@/app/public/images/home/s-cosmos.png";
import bCosmos from "@/app/public/images/home/b-cosmos.png";
import cCosmos from "@/app/public/images/home/c-cosmos.png";
import { client } from '@/sanity/lib/client';

const PSBCCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [ClassNames()]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slidesCount, setSlidesCount] = useState(0);

  const cardsData = [
    {
      imageSrc: pCosmos,
      title: "Promote",
      description: "women in Computing Science",
    },
    {
      imageSrc: sCosmos,
      title: "Support",
      description: "women throughout their study of Computing Science",
    },
    {
      imageSrc: bCosmos,
      title: "Build",
      description: "a strong network of friendly faces for women in Computing Science",
    },
    {
      imageSrc: cCosmos,
      title: "Challenge",
      description: "the biases and myths faced by women in Computing Science",
    },
  ];

  useEffect(() => {
    if (!emblaApi) return;

    const updateSelectedIndex = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', updateSelectedIndex);
    updateSelectedIndex();
    setSlidesCount(emblaApi.scrollSnapList().length);
  }, [emblaApi]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {cardsData.map((card, index) => (
            <div className="min-w-full p-4" key={index}>
              <PSBCCard 
                imageSrc={card.imageSrc} 
                title={card.title} 
                description={card.description} 
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center space-x-2 mt-2">
        {Array.from({ length: slidesCount }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === selectedIndex ? 'bg-wics-blue-500' : 'bg-gray-300'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PSBCCarousel;
