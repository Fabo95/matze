import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

import { getLocale, getLocaleFromPathname, getPage } from 'utils/routing';

// eslint-disable-next-line consistent-return
export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const authToken = request.cookies.get('authToken')?.value;

  let isAuthorized = false;

  if (authToken) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

      await jwtVerify(authToken, secret);

      isAuthorized = true;
    } catch (e) {
      isAuthorized = false;
    }
  }

  const locale =
    getLocaleFromPathname(request.nextUrl.pathname) || getLocale(request);

  const page = getPage(request.nextUrl.pathname, isAuthorized);

  const validPathname = `/${locale}/${page}`;

  const isPathnameValid = pathname === validPathname;

  if (!isPathnameValid) {
    return NextResponse.redirect(new URL(validPathname, request.url));
  }
};

export const config = {
  matcher: ['/', '/de', '/en', '/de/:path*', '/en/:path*'],
};
