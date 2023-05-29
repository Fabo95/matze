import { ReactiveType, RecursiveObjectType } from 'utils/types';
import moment from 'moment';
import { Subject } from 'rxjs';

import { Interval } from 'api/utils/apiTypes';
import { MouseEvent, TouchEvent } from 'react';

/**
 * Takes an nested object and an array of keys and returnes the corresponding nested string value.
 */
export const getNestedObjectValue = (
  obj: RecursiveObjectType | string,
  keys: string[]
): string => {
  const [first, ...rest] = keys;

  if (typeof obj === 'string') {
    return obj;
  }

  if (typeof obj === 'object' && obj[first]) {
    return getNestedObjectValue(obj[first], rest);
  }

  return 'wrong key';
};

/**
 * Takes a duration in seconds and returns either the formatted time in hours or minutes with the proportionate minutes and seconds of the minute started.
 *
 * @param propsSeconds Is the duration in seconds.
 * @see https://momentjs.com/docs/#/durations/
 */
export const getFormattedSeconds = (propsSeconds: number) => {
  const duration = moment.duration(propsSeconds, 'seconds');

  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  if (propsSeconds >= 3600) {
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return `${formattedMinutes}:${formattedSeconds}`;
};

export const getTotalIntervalTime = (interval: Interval) =>
  interval.workTime * interval.exerciseCount * interval.roundCount +
  interval.restTime * (interval.exerciseCount - 1) * interval.roundCount +
  interval.roundResetTime * (interval.roundCount - 1);

export const stopPropagation = (event: MouseEvent<any> | TouchEvent<any>) =>
  event.stopPropagation();

// Musst be outside the function to assure a single instance of the "reactive" variable.
let reactive: ReactiveType<any> = null;
export const getReactiveCallback = <T>() => {
  if (!reactive) {
    const subject = new Subject<T>();
    const observable$ = subject.asObservable();

    reactive = [subject, observable$];
  }

  return reactive;
};
