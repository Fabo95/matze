import { MouseEvent, TouchEvent } from 'react';

export const isTypeOfTouchEvent = (
  event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
): event is TouchEvent<HTMLDivElement> => 'touches' in event;

export const getClientX = (
  event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
) =>
  isTypeOfTouchEvent(event) ? event.changedTouches[0].clientX : event.clientX;

export const getNextItemIndex = ({
  distanceX,
  itemIndex,
}: {
  distanceX: number;
  itemIndex: number;
}) => (distanceX < 0 ? itemIndex + 1 : itemIndex - 1);
