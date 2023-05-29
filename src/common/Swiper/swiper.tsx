import React, {
  Children,
  MouseEvent,
  ReactElement,
  TouchEvent,
  useRef,
  useState,
} from 'react';

import {
  getClientX,
  getNextItemIndex,
} from 'common/Swiper/utils/swiperHelpers';

export type SwiperProps = { children: ReactElement | ReactElement[] };

export const Swiper = ({ children }: SwiperProps) => {
  // --- STATE ---

  const swiperRef = useRef<HTMLDivElement>(null);
  const itemIndexRef = useRef<number>(0);
  const isDraggingRef = useRef(false);

  const [currentXTranslation, setCurrentXTranslation] = useState(0);
  const [distanceX, setDistanceX] = useState(0);
  const [startXPosition, setStartXPosition] = useState(0);

  // --- HELPERS ---

  const isSwiperRefAvailable = swiperRef.current;

  // Number of pixels that the upper left corner of the current element is offset to the left within the HTMLElement.offsetParent node.
  const swiperOffsetLeft = swiperRef.current ? swiperRef.current.offsetLeft : 0;
  const swiperWidth = swiperRef.current ? swiperRef.current.clientWidth : 0;

  const childrenLength = Children.toArray(children).length;

  // --- CALLBACKS ---

  const resetStates = () => {
    isDraggingRef.current = false;

    setDistanceX(0);
    setStartXPosition(0);
  };

  const handleSwipeStart = (
    event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => {
    const clientX = getClientX(event);

    isDraggingRef.current = true;
    setStartXPosition(clientX - swiperOffsetLeft);
  };

  const handleSwipe = (
    event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => {
    const clientX = getClientX(event);

    const currentDistanceX = clientX - startXPosition;

    if (
      // We assume that the swipe movement must be at least 5 px to trigger the swipe execution.
      Math.abs(currentDistanceX) < 5 ||
      !isSwiperRefAvailable ||
      !isDraggingRef.current
    ) {
      return;
    }

    const optimisticXTranslation =
      -itemIndexRef.current * swiperWidth + currentDistanceX;

    const maxXTranslation = -(childrenLength - 1) * swiperWidth;

    // Assures that we can not swipe before the first item.
    if (optimisticXTranslation > 0) {
      setDistanceX(0);
      setCurrentXTranslation(0);
      return;
    }

    // Assures that we can not swipe behind the last item.
    if (optimisticXTranslation < maxXTranslation) {
      setDistanceX(0);
      setCurrentXTranslation(maxXTranslation);
      return;
    }

    setDistanceX(currentDistanceX);
    setCurrentXTranslation(optimisticXTranslation);
  };

  const handleSwipeEnd = (
    event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => {
    const clientX = getClientX(event);

    const currentDistanceX = clientX - startXPosition;

    if (!isSwiperRefAvailable || Math.abs(currentDistanceX) < 5) {
      resetStates();
      return;
    }

    const autoSwipeThreshold = swiperWidth / 3;

    if (Math.abs(distanceX) > autoSwipeThreshold) {
      itemIndexRef.current = getNextItemIndex({
        distanceX,
        itemIndex: itemIndexRef.current,
      });

      setCurrentXTranslation(-itemIndexRef.current * swiperWidth);
      resetStates();

      return;
    }

    setCurrentXTranslation(-itemIndexRef.current * swiperWidth);
    resetStates();
  };

  // --- RENDER ---

  return (
    <div className="swiper" ref={swiperRef}>
      <div
        className="swiper-items"
        style={{ transform: `translateX(${currentXTranslation}px)` }}
        onMouseDown={handleSwipeStart}
        onMouseLeave={handleSwipeEnd}
        onMouseMove={handleSwipe}
        onMouseUp={handleSwipeEnd}
        onTouchEnd={handleSwipeEnd}
        onTouchMove={handleSwipe}
        onTouchStart={handleSwipeStart}
      >
        {children}
      </div>
    </div>
  );
};

export default Swiper;
