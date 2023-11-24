import { match as matchLocale } from '@formatjs/intl-localematcher';
import { i18n } from 'i18n/i18nConfig';
import Negotiator from 'negotiator';
import { NextRequest } from 'next/server';
import { Locale, Page } from 'utils/types';

export const getLocaleFromPathname = (
  pathname: NextRequest['nextUrl']['pathname']
) => {
  const locale = Object.values(Locale).find((currentLocale) =>
    pathname.includes(currentLocale)
  );

  if (!locale) {
    return undefined;
  }

  return locale;
};

export const getPage = (
  pathname: NextRequest['nextUrl']['pathname'],
  isAuthorized: boolean
) => {
  if (isAuthorized) {
    const loggedInPages = Object.values(Page).filter(
      (currentPage) =>
        currentPage !== Page.LOGIN && currentPage !== Page.REGISTER
    );

    const loggedInPage = loggedInPages.find((currentPage) =>
      pathname.includes(currentPage)
    );

    return loggedInPage || Page.HOME;
  }

  const loggedOutPages = Object.values(Page).filter(
    (currentPage) => currentPage === Page.LOGIN || currentPage === Page.REGISTER
  );

  const loggedOutPage = loggedOutPages.find((currentPage) =>
    pathname.includes(currentPage)
  );

  return loggedOutPage || Page.LOGIN;
};

export const getLocale = (request: NextRequest): string | undefined => {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  const { locales } = i18n;

  // eslint-disable-next-line no-return-assign
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  return matchLocale(languages, locales as string[], i18n.defaultLocale);
};
