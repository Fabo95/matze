import { RecursiveObjectType } from 'utils/types';

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
