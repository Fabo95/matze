import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// eslint-disable-next-line import/no-extraneous-dependencies
import { match as matchLocale } from '@formatjs/intl-localematcher';
// eslint-disable-next-line import/no-extraneous-dependencies
import Negotiator from 'negotiator';

import { i18n } from 'i18n/i18n-config';

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
export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Check if there is any supported locale in the pathname
  const isLocaleMissingInPathname = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (isLocaleMissingInPathname) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }
};

export const config = {
  // Matcher ignoring `/_next/` and `/serverAction/`
  matcher: ['/((?!serverAction|_next/static|_next/image|favicon.ico).*)'],
};
