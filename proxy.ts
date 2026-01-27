import { NextRequest, NextResponse } from "next/server";

import { rootDomain } from "./lib";
import { routing } from "./src/i18n/routing";

const extractSubdomain = (req: NextRequest): string | null => {
  const url = req.url;
  const host = req.headers.get('host');

  if (!host) return null;

  const hostname = host.split(':')[0];

  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    const fullUrlMatch = url.match(/http:\/\/([^.]+)\.localhost/);

    if (fullUrlMatch && fullUrlMatch[1]) {
      return fullUrlMatch[1];
    }

    if (hostname.includes('.localhost')) {
      return hostname.split('.')[0];
    }

    return null;
  }

  if (hostname.endsWith('.vercel.app') && hostname.includes('---')) {
    return hostname.split('---')[0];
  }

  if (
    hostname !== rootDomain &&
    hostname !== `www.${rootDomain}` &&
    hostname.endsWith(`.${rootDomain}`)
  ) {
    return hostname.replace(`.${rootDomain}`, '');
  }

  return null;
};

const applyLocale = (response: NextResponse, locale: string) => {
  response.cookies.set('NEXT_LOCALE', locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'lax',
  });

  response.headers.set('x-locale', locale);
  return response;
};

export function proxy(req: NextRequest) {
  // const refreshToken = req.cookies.get("refreshToken")?.value;

  // const { pathname } = req.nextUrl;
  
  // const isPublicPath = PUBLIC_PATHS?.some(
  //   (path) => pathname === path || pathname.startsWith(`${path}/`)
  // );

  // if (!refreshToken && !isPublicPath) {
  //   return NextResponse.redirect(new URL("/authentication", req.url));
  // }

  // if (refreshToken && pathname === "/authentication") {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  // return NextResponse.next();
  const { pathname } = req.nextUrl;
  const locale = req.cookies.get('NEXT_LOCALE')?.value || routing.defaultLocale;

  const subdomain = extractSubdomain(req);

  if (subdomain) {
    if (pathname.startsWith('/vh')) {
      return applyLocale(NextResponse.next(), locale);
    }

    const url = req.nextUrl.clone();
    url.pathname = `/vh/${subdomain}${pathname}`;

    const rewriteResponse = NextResponse.rewrite(url);
    return applyLocale(rewriteResponse, locale);
  }

  return applyLocale(NextResponse.next(), locale);
};

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)',
  ],
};