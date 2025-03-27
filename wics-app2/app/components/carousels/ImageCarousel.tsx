"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { EmblaOptionsType } from "embla-carousel";
import { ReactNode, useEffect, useState } from "react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import { PrevButton, NextButton } from "./EmblaCarouselArrowButtons";

interface ImageType {
  _key: string;
  asset?: { url: string };
  alt?: string;
}

interface CarouselProps {
  images?: ImageType[] | null;
  options?: EmblaOptionsType;
  autoScroll?: boolean;
  scrollInterval?: number;
}

const ImageCarousel = ({ images, options, autoScroll = true, scrollInterval = 3000 }: CarouselProps) => {
  const safeImages = (images ?? []).filter((img) => img?.asset?.url);
  if (safeImages.length === 0) return null;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    ...options,
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const [carouselHeight, setCarouselHeight] = useState("auto");

  // Auto Height Adjustment - EXACTLY matches your working carousel
  useEffect(() => {
    if (!emblaApi) return;
    
    const updateHeight = () => {
      const slides = emblaApi.slideNodes();
      const activeSlide = slides[selectedIndex];
      if (activeSlide) {
        setCarouselHeight(`${activeSlide.clientHeight}px`);
      }
    };

    emblaApi.on("select", updateHeight);
    updateHeight(); // Initial height set

    return () => {
      emblaApi.off("select", updateHeight);
    };
  }, [emblaApi, selectedIndex]);

  // Auto Scroll with Infinite Loop - EXACTLY matches your working carousel
  useEffect(() => {
    if (!emblaApi || !autoScroll) return;

    const autoScrollInterval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0); // Reset to first slide
      }
    }, scrollInterval);

    return () => clearInterval(autoScrollInterval);
  }, [emblaApi, autoScroll, scrollInterval]);

  return (
    <section className="relative mx-auto w-full overflow-hidden">
      {/* Carousel Viewport with Auto Height - identical structure */}
      <div className="rounded-2xl">
        <div 
          className="overflow-hidden transition-all duration-300" 
          ref={emblaRef} 
          style={{ height: carouselHeight }}
        >
          {/* Carousel Container - identical structure */}
          <div className="-ml-4 flex items-start touch-pan-y touch-pinch-zoom">
            {safeImages.map((img) => (
              <div key={img._key} className="w-full flex-shrink-0 pl-4">
                <Image
                  src={img.asset?.url || ""}
                  alt={img.alt || "Carousel Image"}
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel Controls - identical structure */}
      {safeImages.length > 1 && emblaApi && (
        <div className="mt-5 grid grid-cols-[auto_1fr] justify-between gap-4">
          {/* Always Enabled Navigation Buttons */}
          <div className="grid grid-cols-2 items-center gap-2">
            <PrevButton onClick={() => emblaApi.scrollPrev()} />
            <NextButton onClick={() => emblaApi.scrollNext()} />
          </div>

          {/* Dots Navigation */}
          <div className="flex items-center justify-end">
            <div className="flex flex-wrap">
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={`mx-1 h-4 w-4 rounded-full border-2 border-gray transition-all ${
                    index === selectedIndex ? "border-2 border-wics-blue-500" : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ImageCarousel;