export enum Locale {
  DE = 'de',
  EN = 'en',
}

export type ValueOf<T> = T[keyof T];

/**
 * Recursive type that reference itself to type nested objects.
 * @see https://stackoverflow.com/questions/71654892/how-type-recursive-object-in-typescript
 */
export type RecursiveObjectType = {
  [key: string]: string | RecursiveObjectType;
};
