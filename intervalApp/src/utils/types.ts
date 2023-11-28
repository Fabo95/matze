import { CSSProperties } from "react";

import { Observable, Subject } from "rxjs";

import GermanTranslation from "@Interval/i18n/dictionaries/de.json";

export enum Locale {
    DE = "de",
    EN = "en",
}

export enum Page {
    CHAT = "chat",
    HISTORY = "history",
    HOME = "home",
    LOGIN = "login",
    REGISTER = "register",
    SETTINGS = "settings",
    STATISTICS = "statistics",
}

export type LoggedInPage = Exclude<Page, Page.LOGIN | Page.REGISTER>;

export enum ValidationError {
    EXISTING_EMAIL = "existingEmail",
    INVALID_EMAIL = "invalidEmail",
    INVALID_PASSWORD = "invalidPassword",
    MIN_LENGTH_PASSWORD = "minLengthPassword",
    NON_MATCHING_PASSWORD = "nonMatchingPassword",
    REQUIRED_CONFIRM_PASSWORD = "requiredConfirmPassword",
    REQUIRED_EMAIL = "requiredEmail",
    REQUIRED_PASSWORD = "requiredPassword",
    SERVER_ERROR = "serverError",
}

export type RegisterError = Exclude<ValidationError, "missingUser" | "incorrectPassword">;

export type LoginError = Exclude<ValidationError, "requiredConfirmPassword" | "nonMatchingPassword" | "existingEmail">;

export type Dictionary = typeof GermanTranslation;

export type TFunction = (
    translationKey: Join<ObjectPaths<Dictionary>, ".">,
    interpolation?: Record<string, string | number>
) => string;

export type ValueOf<T> = T[keyof T];

/**
 * Recursive type that reference itself to type nested objects.
 * @see https://stackoverflow.com/questions/71654892/how-type-recursive-object-in-typescript
 */
export type RecursiveObjectType = {
    [key: string]: string | RecursiveObjectType;
};

export type ReactiveType<T> = null | [callback: Subject<T>, observable$: Observable<T>];

export type CustomCSSProperties = CSSProperties & {
    "--my-css-var": number;
};

/**
 * Creates a union of tuple types with all the possible paths through the nested object structure, where each tuple represents a path of keys to a specific object value.
 *
 * @See: https://stackoverflow.com/questions/47057649/typescript-string-dot-notation-of-nested-object
 *
 * @Example:
 * The return type looks like the following:
 *
 * type ExampleReturnType =
 *   | ["pages", "intervalTimer", "headline"]
 *   | ["pages", "intervalTimer", "menuOption"]
 *   | ["pages", "intervalTimer", "intervalTimerSettingOption", "optionOne"]
 *   | ["pages", "intervalTimer", "intervalTimerSettingOption", "optionTwo"]
 *   | ["pages", "intervalTimer", "intervalTimerSettingOption", "optionThree"]
 *   | ["pages", "intervalTimer", "intervalTimerSettingOption", "optionFour"]
 *   | ["pages", "intervalTimer", "intervalTimerSettingOption", "optionFive"]
 *   | ["pages", "intervalTimer", "intervalTimerOverview", "timeLeft"]
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
