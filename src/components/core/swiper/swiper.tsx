import React, {
  Children,
  MouseEvent,
  ReactElement,
  TouchEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  getClientX,
  getNextItemIndex,
} from '@Interval/components/core/swiper/utils/swiperHelpers';

export type SwiperProps = {
  children: ReactElement | ReactElement[];
  autoSwipe: {
    shouldSwipe: boolean;
    itemIndex: number;
  };
};

export const Swiper = ({ children, autoSwipe }: SwiperProps) => {
  // --- STATE ---

  const swiperRef = useRef<HTMLDivElement>(null);
  const itemIndexRef = useRef<number>(0);

  const [isDragging, setIsDragging] = useState(false);
  const [currentXTranslation, setCurrentXTranslation] = useState(0);
  const [distanceX, setDistanceX] = useState(0);
  const [startXPosition, setStartXPosition] = useState(0);

  // --- HELPERS ---

  const isSwiperRefAvailable = swiperRef.current;

  const swiperWidth = swiperRef.current ? swiperRef.current.clientWidth : 0;

  const childrenLength = Children.toArray(children).length;

  const swiperItemsWidth = childrenLength * 100;

  // --- CALLBACKS ---

  const resetStates = () => {
    setIsDragging(false);

    setDistanceX(0);
    setStartXPosition(0);
  };

  const handleSwipeStart = (
    event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => {
    const clientX = getClientX(event);

    setIsDragging(true);
    setStartXPosition(clientX);
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
      !isDragging
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

  // --- EFFECTS ---

  useEffect(() => {
    if (autoSwipe.shouldSwipe) {
      itemIndexRef.current = autoSwipe.itemIndex;
      setCurrentXTranslation(-itemIndexRef.current * swiperWidth);
    }
  }, [autoSwipe.shouldSwipe, autoSwipe.itemIndex, swiperWidth]);

  // --- RENDER ---

  return (
    <div className="swiper" ref={swiperRef}>
      <div
        className="swiper-items"
        role="presentation"
        style={{
          transform: `translateX(${currentXTranslation}px)`,
          transition: isDragging ? '0ms' : '150ms',
          width: `${swiperItemsWidth}%`,
        }}
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
