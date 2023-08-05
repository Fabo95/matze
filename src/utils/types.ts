import { Observable, Subject } from 'rxjs';
import { CSSProperties } from 'react';

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
  INVALID_EMAIL = 'invalidEmail',
  INVALID_PASSWORD = 'invalidPassword',
  NON_MATCHING_PASSWORD = 'nonMatchingPassword',
  EXISTING_EMAIL = 'existingEmail',
  SERVER_ERROR = 'serverError',
}

export type TFunction = (translationKeys: string) => string;

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
