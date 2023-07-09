import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
// eslint-disable-next-line import/no-extraneous-dependencies
import { match as matchLocale } from '@formatjs/intl-localematcher';
// eslint-disable-next-line import/no-extraneous-dependencies
import Negotiator from 'negotiator';

import { i18n } from 'i18n/i18n-config';
import { Locale, Page } from 'utils/types';
import { apiGetAuthTokenValidation } from 'api/api';

function getLocaleFromPathname(pathname: NextRequest['nextUrl']['pathname']) {
  const locale = Object.values(Locale).find((currentLocale) =>
    pathname.includes(currentLocale)
  );

  if (!locale) {
    return undefined;
  }

  return locale;
}

function getPage(
  pathname: NextRequest['nextUrl']['pathname'],
  authHttpStatus: number | undefined | ''
) {
  if (authHttpStatus === 200) {
    const pages = Object.values(Page).filter(
      (currentPage) => currentPage !== Page.LOGIN
    );

    const page = pages.find((currentPage) => pathname.includes(currentPage));

    return page || Page.HOME;
  }

  return Page.LOGIN;
}

const getLocale = (request: NextRequest): string | undefined => {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  const { locales } = i18n;

  // eslint-disable-next-line no-return-assign
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  return matchLocale(languages, locales as string[], i18n.defaultLocale);
};

// eslint-disable-next-line consistent-return
export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const authToken = request.cookies.get('authToken')?.value;
  const authTokenValidation =
    authToken && (await apiGetAuthTokenValidation(authToken));
  const authHttpStatus = authTokenValidation && authTokenValidation.status;

  const locale =
    getLocaleFromPathname(request.nextUrl.pathname) || getLocale(request);
  const page = getPage(request.nextUrl.pathname, authHttpStatus);

  const validPathname = `/${locale}/${page}`;

  const isPathnameValid = pathname === validPathname;

  if (!isPathnameValid) {
    return NextResponse.redirect(new URL(validPathname, request.url));
  }
};

export const config = {
  // Matcher ignoring `/_next/` and `/serverAction/`
  matcher: ['/((?!serverAction|_next/static|_next/image|favicon.ico).*)'],
};
