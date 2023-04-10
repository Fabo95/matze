import { Locale } from 'utils/types';
import { getNestedObjectValue } from 'utils/helpers';

const LOCALE_TO_DICTIONARY_MAP = {
  [Locale.EN]: () =>
    import('./dictionaries/en.json').then((module) => module.default),
  [Locale.DE]: () =>
    import('./dictionaries/de.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  const dictionary = await LOCALE_TO_DICTIONARY_MAP[locale]?.();

  const tFunction = (translationKeys: string): string => {
    const properties = translationKeys.split('.');

    return getNestedObjectValue(dictionary, properties);
  };

  return tFunction;
};
