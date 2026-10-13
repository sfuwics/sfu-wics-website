import React from "react";

interface DotButtonProps {
  onClick: () => void;
  className?: string;
  label?: string;
  selected?: boolean;
}

export const DotButton = ({
  onClick,
  className,
  label,
  selected,
}: DotButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      aria-label={label}
      aria-current={selected ? "true" : undefined}
    />
  );
};

export const useDotButton = (emblaApi: any) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onDotButtonClick = React.useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};
