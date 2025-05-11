"use client";

import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { ReactNode, useEffect, useState } from "react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import { PrevButton, NextButton } from "./EmblaCarouselArrowButtons"; // No need for disabled state

interface CarouselProps {
  children: ReactNode[];
  options?: EmblaOptionsType;
  autoScroll?: boolean;
  scrollInterval?: number;
}

const Carousel = ({ children, options, autoScroll = true, scrollInterval = 3000 }: CarouselProps) => {
  if (!children || children.length === 0) return null;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true, // Enable infinite looping
    align: "start",
    ...options,
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const [carouselHeight, setCarouselHeight] = useState("auto");

  // Auto Height Adjustment
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
    updateHeight();
  }, [emblaApi, selectedIndex]);

  // Auto Scroll with Infinite Loop
  useEffect(() => {
    if (!emblaApi || !autoScroll) return;

    const autoScrollInterval = setInterval(() => {
      if (!emblaApi) return;

      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0); // Reset to first slide seamlessly
      }
    }, scrollInterval);

    return () => clearInterval(autoScrollInterval);
  }, [emblaApi, autoScroll, scrollInterval]);

  return (
    <section className="relative mx-auto w-full overflow-hidden">
      {/* Carousel Viewport with Auto Height */}
      <div className="p-4 2xl:p-8 border border-black rounded-2xl">
        <div className="overflow-hidden transition-all duration-300" ref={emblaRef} style={{ height: carouselHeight }}>
          {/* Carousel Container */}
          <div className="-ml-4 flex items-start touch-pan-y touch-pinch-zoom">
            {children.map((child, index) => (
              <div key={index} className="w-full flex-shrink-0 pl-4">{child}</div>
            ))}
          </div>
        </div>
      </div>


      {/* Carousel Controls */}
      {children.length > 1 && emblaApi && (
        <div className="mt-5 grid grid-cols-[auto_1fr] justify-between gap-4">
          {/* Always Enabled Navigation Buttons */}
          <div className="grid grid-cols-2 items-center gap-2">
            <PrevButton onClick={() => emblaApi.scrollPrev()} /> {/* Always active */}
            <NextButton onClick={() => emblaApi.scrollNext()} /> {/* Always active */}
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

export default Carousel;
