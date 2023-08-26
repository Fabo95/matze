import { Dictionary, Join, Locale, ObjectPaths } from 'utils/types';
import { getNestedObjectValue } from 'utils/helpers';
import GermanTranslation from 'i18n/dictionaries/de.json';
import EnglishTranslation from 'i18n/dictionaries/en.json';

const LOCALE_TO_DICTIONARY_MAP = {
  [Locale.EN]: EnglishTranslation,
  [Locale.DE]: GermanTranslation,
};

export const getTFunction = (locale: Locale) => {
  const dictionary: Dictionary = LOCALE_TO_DICTIONARY_MAP[locale];

  return (
    translationKey: Join<ObjectPaths<Dictionary>, '.'>,
    interpolation?: Record<string, string | number>
  ): string => {
    const properties = translationKey.split('.');

    const translation = getNestedObjectValue(dictionary, properties);

    if (!interpolation) {
      return translation;
    }

    // Replaces placeholders in a translation string with dynamic values passed in the interpolation object.
    return translation.replace(/{(.*?)}/g, (match, key) =>
      String(interpolation[key])
    );
  };
};
