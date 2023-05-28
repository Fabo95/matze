import React, {
  Children,
  MouseEvent,
  ReactElement,
  useRef,
  useState,
} from 'react';

export type SwiperProps = { children: ReactElement[] };

export const Swiper = ({ children }: SwiperProps) => {
  const swiperRef = useRef<HTMLDivElement>(null);
  const startXPositionRef = useRef<number>(0);
  const currentItemIndexRef = useRef<number>(0);

  const [isDragging, setIsDragging] = useState(false);
  const [currentXTranslation, setCurrentXTranslation] = useState(0);
  const [distanceX, setDistanceX] = useState(0);

  // --- HELPERS ---

  const isSwiperRefAvailable = swiperRef.current;

  // Number of pixels that the upper left corner of the current element is offset to the left within the HTMLElement.offsetParent node.
  const swiperOffsetLeft = swiperRef.current ? swiperRef.current.offsetLeft : 0;
  const swiperWidth = swiperRef.current ? swiperRef.current.clientWidth : 0;

  const childrenLength = Children.toArray(children).length;

  // --- CALLBACKS ---

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsDragging(true);

    startXPositionRef.current = event.clientX - swiperOffsetLeft;
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!isDragging || !isSwiperRefAvailable) {
      return;
    }

    const currentDistanceX = event.clientX - startXPositionRef.current;

    const optimisticXTranslation =
      -currentItemIndexRef.current * swiperWidth + currentDistanceX;
    const maxXTranslation = -(childrenLength - 1) * swiperWidth;

    if (optimisticXTranslation > 0) {
      setDistanceX(0);
      setCurrentXTranslation(0);
      return;
    }

    if (optimisticXTranslation < maxXTranslation) {
      setDistanceX(0);
      setCurrentXTranslation(maxXTranslation);
      return;
    }
    setDistanceX(currentDistanceX);
    setCurrentXTranslation(optimisticXTranslation);
  };

  const handleMouseUp = () => {
    if (!isDragging || !isSwiperRefAvailable) {
      return;
    }

    setIsDragging(false);

    const autoSwipeThreshold = swiperWidth / 2;

    if (Math.abs(distanceX) > autoSwipeThreshold) {
      const nextItemIndex =
        distanceX < 0
          ? currentItemIndexRef.current + 1
          : currentItemIndexRef.current - 1;

      currentItemIndexRef.current = nextItemIndex;
      setCurrentXTranslation(-nextItemIndex * swiperWidth);

      return;
    }

    setCurrentXTranslation(-currentItemIndexRef.current * swiperWidth);
  };

  // --- RENDER ---

  return (
    <div className="swiper" ref={swiperRef}>
      <div
        className="swiper-items"
        style={{ transform: `translateX(${currentXTranslation}px)` }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {children}
      </div>
    </div>
  );
};

export default Swiper;
