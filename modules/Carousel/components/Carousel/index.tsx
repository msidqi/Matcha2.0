import React from "react";

interface CarouselProps {
  prevArrow: React.ReactElement;
  nextArrow: React.ReactElement;
  items: React.ReactElement[];
  containerClassName?: string;
  style?: React.CSSProperties;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  prevArrow,
  nextArrow,
  containerClassName,
  style,
}) => {
  const [index, setIndex] = React.useState(0);

  const onPrevClick = () => index > 0 && setIndex((prev) => prev - 1);
  const onNextClick = () =>
    index < items.length - 1 && setIndex((prev) => prev + 1);

  const hidePrevArrow = Boolean(prevArrow && items.length && index != 0);
  const hideNextArrow = Boolean(
    nextArrow && items.length && index != items.length - 1
  );
  return (
    <div style={style} className={`relative ${containerClassName ?? "h-44"}`}>
      {hidePrevArrow && (
        <div
          className="absolute top-1/2 left-1 transform -translate-y-1/2 z-10"
          onClick={onPrevClick}
        >
          {prevArrow}
        </div>
      )}
      {hideNextArrow && (
        <div
          className="absolute top-1/2 right-1 transform -translate-y-1/2 z-10"
          onClick={onNextClick}
        >
          {nextArrow}
        </div>
      )}
      <div className="absolute top-0 left-0 w-full h-full">{items[index]}</div>
    </div>
  );
};

export default Carousel;
