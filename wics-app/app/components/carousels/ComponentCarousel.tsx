"use client";

import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { ReactNode, useEffect, useState, useCallback } from "react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import { PrevButton, NextButton } from "./EmblaCarouselArrowButtons";

interface CarouselProps {
  children: ReactNode[];
  options?: EmblaOptionsType;
  autoScroll?: boolean;
  scrollInterval?: number;
}

const Carousel = ({ children, options, autoScroll = true, scrollInterval = 3000 }: CarouselProps) => {
  if (!children || children.length === 0) return null;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    ...options,
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const [carouselHeight, setCarouselHeight] = useState("auto");

  // Update carousel height based on active slide
  const updateHeight = useCallback(() => {
    if (!emblaApi) return;
    
    const slides = emblaApi.slideNodes();
    const activeSlide = slides[emblaApi.selectedScrollSnap()];
    
    if (activeSlide) {
      setCarouselHeight(`${activeSlide.clientHeight}px`);
    }
  }, [emblaApi]);

  // Initialize and handle resize events
  useEffect(() => {
    if (!emblaApi) return;

    // Initial height calculation
    updateHeight();

    // Add resize observer
    const resizeObserver = new ResizeObserver(() => {
      emblaApi.reInit();
      updateHeight();
    });

    const viewport = emblaApi.containerNode();
    if (viewport) {
      resizeObserver.observe(viewport);
    }

    // Add slide change listener
    emblaApi.on("select", updateHeight);
    emblaApi.on("reInit", updateHeight);

    return () => {
      resizeObserver.disconnect();
      emblaApi.off("select", updateHeight);
      emblaApi.off("reInit", updateHeight);
    };
  }, [emblaApi, updateHeight]);

  // Auto Scroll with Infinite Loop
  useEffect(() => {
    if (!emblaApi || !autoScroll) return;

    const autoScrollInterval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, scrollInterval);

    return () => clearInterval(autoScrollInterval);
  }, [emblaApi, autoScroll, scrollInterval]);

  return (
    <section className="relative mx-auto w-full overflow-hidden">
      <div className="p-4 2xl:p-8 border border-black rounded-2xl">
        <div 
          className="overflow-hidden transition-all duration-300" 
          ref={emblaRef} 
          style={{ height: carouselHeight, minHeight: '100px' }} // Added min-height as fallback
        >
          <div className="-ml-4 flex items-start touch-pan-y touch-pinch-zoom">
            {children.map((child, index) => (
              <div key={index} className="w-full flex-shrink-0 pl-4 min-w-0">
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>

      {children.length > 1 && emblaApi && (
        <div className="mt-5 grid grid-cols-[auto_1fr] justify-between gap-4">
          <div className="grid grid-cols-2 items-center gap-2">
            <PrevButton onClick={() => emblaApi.scrollPrev()} />
            <NextButton onClick={() => emblaApi.scrollNext()} />
          </div>

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