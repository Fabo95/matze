import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getLocale, getLocaleFromPathname, getPage } from "@Interval/utils/routing";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;

    const authToken = request.cookies.get("authToken")?.value;

    let isAuthorized = false;

    if (authToken) {
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
            // eslint-disable-next-line functional/no-expression-statements
            await jwtVerify(authToken, secret);

            // eslint-disable-next-line functional/no-expression-statements
            isAuthorized = true;
        } catch (e) {
            // eslint-disable-next-line functional/no-expression-statements
            isAuthorized = false;
        }

        return;
    }

    const locale = getLocaleFromPathname(request.nextUrl.pathname) || getLocale(request);

    const page = getPage(request.nextUrl.pathname, isAuthorized);

    const validPathname = `/${locale}/${page}`;

    const isPathnameValid = pathname === validPathname;

    if (!isPathnameValid) {
        return NextResponse.redirect(new URL(validPathname, request.url));
    }
};

export const config = {
    matcher: ["/", "/de", "/en", "/de/:path*", "/en/:path*"],
};
