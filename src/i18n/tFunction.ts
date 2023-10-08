import { Dictionary, Locale, TFunction } from 'utils/types';
import { getNestedObjectValue } from 'utils/helpers';
import GermanTranslation from 'i18n/dictionaries/de.json';
import EnglishTranslation from 'i18n/dictionaries/en.json';
import { TRANSLATION_STRING_PLACEHOLDER_PATTERN } from 'utils/constants';

const LOCALE_TO_DICTIONARY_MAP = {
  [Locale.EN]: EnglishTranslation,
  [Locale.DE]: GermanTranslation,
};

export const getTFunction = (locale: Locale): TFunction => {
  const dictionary: Dictionary = LOCALE_TO_DICTIONARY_MAP[locale];

  return (translationKey, interpolation) => {
    const properties = translationKey.split('.');

    const translation = getNestedObjectValue(dictionary, properties);

    if (!interpolation) {
      return translation;
    }

    return translation.replace(
      TRANSLATION_STRING_PLACEHOLDER_PATTERN,
      (match, key) => String(interpolation[key])
    );
  };
};
