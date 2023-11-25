import GermanTranslation from '@Interval/i18n/dictionaries/de.json';
import EnglishTranslation from '@Interval/i18n/dictionaries/en.json';
import { TRANSLATION_STRING_PLACEHOLDER_PATTERN } from '@Interval/utils/constants';
import { getNestedObjectValue } from '@Interval/utils/helpers';
import { Dictionary, Locale, TFunction } from '@Interval/utils/types';

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
