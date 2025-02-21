import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import icons

interface ArrowButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const PrevButton = ({ onClick, disabled }: ArrowButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-200 transition-colors hover:bg-gray-200 disabled:opacity-50"
    >
      <FaChevronLeft className="h-5 w-5 text-wics-blue-500" />
    </button>
  );
};

export const NextButton = ({ onClick, disabled }: ArrowButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-200 transition-colors hover:bg-neutral-200 disabled:opacity-50"
    >
      <FaChevronRight className="h-5 w-5 text-wics-blue-500" />
    </button>
  );
};

export const usePrevNextButtons = (emblaApi: any) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
    };

    emblaApi.on("select", onSelect);
    onSelect(); // Call once to set initial state

    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick: () => emblaApi?.scrollPrev(),
    onNextButtonClick: () => emblaApi?.scrollNext(),
  };
};