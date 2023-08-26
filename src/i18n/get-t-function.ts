import { Dictionary, Join, Locale, ObjectPaths } from 'utils/types';
import { getNestedObjectValue } from 'utils/helpers';

const LOCALE_TO_DICTIONARY_MAP = {
  [Locale.EN]: () =>
    import('./dictionaries/en.json').then((module) => module.default),
  [Locale.DE]: () =>
    import('./dictionaries/de.json').then((module) => module.default),
};

export const getTFunction = async (locale: Locale) => {
  const dictionary: Dictionary = await LOCALE_TO_DICTIONARY_MAP[locale]?.();

  return (translationKey: Join<ObjectPaths<Dictionary>, '.'>): string => {
    const properties = translationKey.split('.');

    return getNestedObjectValue(dictionary, properties);
  };
};
