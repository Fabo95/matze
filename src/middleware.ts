import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { apiGetAuthTokenValidation } from 'api/api';
import { getLocale, getLocaleFromPathname, getPage } from 'utils/routing';

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

  console.log('pathname', pathname);

  console.log('validPathname', validPathname);

  const isPathnameValid = pathname === validPathname;

  if (!isPathnameValid) {
    return NextResponse.redirect(new URL(validPathname, request.url));
  }
};

export const config = {
  matcher: ['/', '/de', '/en', '/de/:path*', '/en/:path*'],
};
