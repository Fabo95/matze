import { RecursiveObjectType } from 'utils/types';
import moment from 'moment';

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
 * Takes a duration in seconds and returns the formatted time in minutes with the proportionate seconds of the minute started.
 *
 * @param propsSeconds Is the duration in seconds.
 * @see https://momentjs.com/docs/#/durations/
 */
export const getFormattedSecondsToMinutes = (propsSeconds: number) => {
  const duration = moment.duration(propsSeconds, 'seconds');

  const minutes = duration.minutes();
  const seconds = duration.seconds();

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedMinutes}:${formattedSeconds}`;
};

export const mapIndexToIntensity = ({
  index,
  maxIndex = 100,
  maxIntensity,
}: {
  index: number;
  maxIndex?: number;
  maxIntensity: number;
}) => (index * maxIntensity) / maxIndex;

export const mapIntensityToIndex = ({
  intensity,
  maxIndex = 100,
  maxIntensity,
}: {
  intensity: number;
  maxIndex?: number;
  maxIntensity: number;
}) => (intensity * maxIndex) / maxIntensity;
