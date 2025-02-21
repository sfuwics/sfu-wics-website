"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

interface ImageType {
  _key: string;
  asset: { url: string };
  alt?: string;
}

interface CarouselProps {
  images?: ImageType[] | null;
  options?: EmblaOptionsType;
}

const ImageCarousel = ({ images, options }: CarouselProps) => {
  const safeImages = images ?? [];
  if (safeImages.length === 0) {
    return null;
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const isEmblaReady = !!emblaApi;

  return (
    <section className="relative mx-auto w-full max-w-4xl overflow-hidden">
      {/* Carousel Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        {/* Carousel Container */}
        <div className="-ml-4 flex touch-pan-y touch-pinch-zoom">
          {safeImages.map((img) => (
            <div key={img._key} className="w-full flex-shrink-0 pl-4">
              <Image
                src={img.asset.url}
                alt={img.alt || "Carousel Image"}
                width={800}
                height={500}
                className="w-full rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Controls */}
      {safeImages.length > 1 && isEmblaReady &&  (
        <div className="mt-5 grid grid-cols-[auto_1fr] justify-between gap-4">
        {/* Navigation Buttons */}
        <div className="grid grid-cols-2 items-center gap-2">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="flex items-center justify-end">
          {/* Dots Navigation */}
          {safeImages.length > 1 && (
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
          )}
        </div>
      </div>
      )}
    </section>
  );
};

export default ImageCarousel;
