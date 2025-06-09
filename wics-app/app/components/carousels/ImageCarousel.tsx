"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { EmblaOptionsType } from "embla-carousel";
import { useEffect, useState, useCallback } from "react";
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

const ImageCarousel = ({
  images,
  options,
  autoScroll = true,
  scrollInterval = 3000,
}: CarouselProps) => {
  const safeImages = (images ?? []).filter((img) => img?.asset?.url);
  if (safeImages.length === 0) return null;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    ...options,
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const [carouselHeight, setCarouselHeight] = useState("auto");

  const updateHeight = useCallback(() => {
    if (!emblaApi) return;

    const slides = emblaApi.slideNodes();
    const activeSlide = slides[selectedIndex];
    if (!activeSlide) return;

    const img = activeSlide.querySelector("img");
    if (img && img.complete) {
      setCarouselHeight(`${img.offsetHeight}px`);
    } else {
      // Fallback to scrollHeight if image isn't loaded yet
      setCarouselHeight(`${activeSlide.scrollHeight}px`);
    }
  }, [emblaApi, selectedIndex]);

  // Initialize height tracking
  useEffect(() => {
    if (!emblaApi) return;

    // Initial height calculation
    updateHeight();

    // Update height on slide change
    emblaApi.on("select", updateHeight);

    // Additional check after images load
    const checkAfterLoad = () => {
      setTimeout(updateHeight, 100);
      setTimeout(updateHeight, 500); // Double check
    };

    // Set up mutation observer to catch image loads
    const observer = new MutationObserver(checkAfterLoad);
    const slides = emblaApi.slideNodes();
    slides.forEach((slide) => {
      observer.observe(slide, { childList: true, subtree: true });
    });

    return () => {
      emblaApi.off("select", updateHeight);
      observer.disconnect();
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
      <div className="">
        <div
          className="overflow-hidden transition-all duration-300"
          ref={emblaRef}    
          style={{ height: carouselHeight }}
        >
          <div className="-ml-4 flex touch-pan-y touch-pinch-zoom items-start">
            {safeImages.map((img) => (
              <div key={img._key} className="w-full flex-shrink-0 pl-4">
                <Image
                  src={img.asset?.url || ""}
                  alt={img.alt || "Carousel Image"}
                  width={1200}
                  height={800}
                  placeholder={img.asset?.metadata?.lqip ? "blur" : "empty"}
                  blurDataURL={img.asset?.metadata?.lqip}
                  className="h-auto w-full rounded-xl transition-opacity duration-700 opacity-100 motion-safe:animate-fadeIn"
                  priority={true}
                  onLoadingComplete={updateHeight}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {safeImages.length > 1 && emblaApi && (
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
                  className={`border-gray mx-1 h-4 w-4 rounded-full border-2 transition-all ${
                    index === selectedIndex
                      ? "border-2 border-wics-blue-500"
                      : ""
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
