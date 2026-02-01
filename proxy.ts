import { NextRequest, NextResponse } from "next/server";

import { protocol, rootDomain } from "./lib";
import { routing } from "./src/i18n/routing";
import { PUBLIC_PATHS, SYS_PATHS } from "./src/constants/path";

const applyLocale = (response: NextResponse, locale: string) => {
  response.cookies.set('NEXT_LOCALE', locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'lax',
  });

  response.headers.set('x-locale', locale);

  return response;
};

const extractSubdomain = (req: NextRequest): string | null => {
  const host = req.headers.get('host') ?? '';
  const hostname = host.split(':')[0];

  if (hostname.includes('localhost')) {
    const parts = hostname.split('.');

    return parts.length > 1 && parts[0] !== 'localhost' ? parts[0] : null;
  }

  return null;
};

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const subdomain = extractSubdomain(req);
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const locale = req.cookies.get('NEXT_LOCALE')?.value || routing.defaultLocale;

  //////////////////// CHECK LOGIN ////////////////////
  const isPublicPath = PUBLIC_PATHS?.some((path) => {
    if (path === SYS_PATHS.root) {
      return pathname === SYS_PATHS.root;
    }

    return pathname === path || pathname.startsWith(`${path}/`);
  })

  // if (!subdomain) {
  //   // Chưa login → ép về /auth?type=login
  //   if (!refreshToken && !isPublicPath) {
  //     const url = new URL(SYS_PATHS.auth, req.url);
  //     url.searchParams.set('type', 'login');

  //     return applyLocale(NextResponse.redirect(url), locale);
  //   }

  //   // Đã login → redirect sang tenant
  //   if (refreshToken && isPublicPath) {
  //     return NextResponse.redirect(
  //       new URL(`${protocol}://test.${rootDomain}/dashboard`)
  //     );
  //   }

  //   return NextResponse.next()
  // }

  // if (!refreshToken) {
  //   const url = new URL(`${protocol}://${rootDomain}/auth`);
  //   url.searchParams.set('type', 'login');

  //   return NextResponse.redirect(url);
  // }

  // // Đã login + tenant domain → OK
  // return applyLocale(NextResponse.next(), locale);

  ////////////////// WHEN NO LOGIN ////////////////////
  if (!refreshToken && !isPublicPath) {
    return NextResponse.redirect(
      `${protocol}://${rootDomain}${SYS_PATHS.root}`
    );
  }

  //////////////////// WHEN LOGIN ////////////////////
  if (refreshToken && isPublicPath) {
    return NextResponse.redirect(
      `${protocol}://test.${rootDomain}/dashboard`
    );
  }

  return applyLocale(NextResponse.next(), locale);
};

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)',
  ],
};