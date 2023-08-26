import { Observable, Subject } from 'rxjs';
import { CSSProperties } from 'react';

import GermanTranslation from 'i18n/dictionaries/de.json';

export enum Locale {
  DE = 'de',
  EN = 'en',
}

export enum Page {
  HOME = 'home',
  HISTORY = 'history',
  SETTINGS = 'settings',
  STATISTICS = 'statistics',
  LOGIN = 'login',
  REGISTER = 'register',
}

export enum ValidationError {
  REQUIRED_EMAIL = 'requiredEmail',
  REQUIRED_PASSWORD = 'requiredPassword',
  REQUIRED_CONFIRM_PASSWORD = 'requiredConfirmPassword',
  INVALID_EMAIL = 'invalidEmail',
  INVALID_PASSWORD = 'invalidPassword',
  MIN_LENGTH_PASSWORD = 'minLengthPassword',
  NON_MATCHING_PASSWORD = 'nonMatchingPassword',
  EXISTING_EMAIL = 'existingEmail',
  SERVER_ERROR = 'serverError',
}

export type Dictionary = typeof GermanTranslation;

export type TFunction = (
  translationKey: Join<ObjectPaths<Dictionary>, '.'>
) => string;

export type ValueOf<T> = T[keyof T];

/**
 * Recursive type that reference itself to type nested objects.
 * @see https://stackoverflow.com/questions/71654892/how-type-recursive-object-in-typescript
 */
export type RecursiveObjectType = {
  [key: string]: string | RecursiveObjectType;
};

export type ReactiveType<T> =
  | null
  | [callback: Subject<T>, observable$: Observable<T>];

export type CustomCSSProperties = CSSProperties & { '--my-css-var': number };

/**
 * Creates a union of tuple types with all the possible paths through the nested object structure, where each tuple represents a path of keys to a specific object value.
 *
 * @Example:
 * The return type looks like the following:
 *
 * type ExampleReturnType =
 *   | ["pages", "home", "headline"]
 *   | ["pages", "home", "menuOption"]
 *   | ["pages", "home", "intervalTimerSettingOption", "optionOne"]
 *   | ["pages", "home", "intervalTimerSettingOption", "optionTwo"]
 *   | ["pages", "home", "intervalTimerSettingOption", "optionThree"]
 *   | ["pages", "home", "intervalTimerSettingOption", "optionFour"]
 *   | ["pages", "home", "intervalTimerSettingOption", "optionFive"]
 *   | ["pages", "home", "intervalTimerOverview", "timeLeft"]
 *   | ["pages", "settings", "headline"]
 *   | ["pages", "settings", "menuOption"]
 *
 */

export type ObjectPaths<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...ObjectPaths<T[K]>];
    }[Extract<keyof T, string>];

// Recursively joins an array of strings to a string seperated by D.
export type Join<T extends string[], D extends string> = T extends []
  ? never
  : T extends [infer F]
  ? F
  : T extends [infer F, ...infer R]
  ? F extends string
    ? `${F}${D}${Join<Extract<R, string[]>, D>}`
    : never
  : string;
