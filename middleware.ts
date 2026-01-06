import { NextRequest, NextResponse } from "next/server";

import { PUBLIC_PATHS } from "./src/constants/path";
import { rootDomain } from "./lib";

export const isPublicPath = (pathname: string) => {
  return PUBLIC_PATHS?.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
};

export const extractSubdomain = (req: NextRequest): string | null => {
  const url = req.url;
  const host = req.headers.get('host') || '';
  const hostname = host.split(':')[0];

  // Local development environment
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

  // Production environment
  const rootDomainFormatted = rootDomain.split(':')[0];

  if (hostname.includes('---') && hostname.endsWith('.vercel.app')) {
    const parts = hostname.split('---');

    return parts.length > 0 ? parts[0] : null;
  }

  const isSubdomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}` &&
    hostname.endsWith(`.${rootDomainFormatted}`);

  return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, '') : null;
}

export const middleware = async (req: NextRequest) => {
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
  const subdomain = extractSubdomain(req);

  if (subdomain) {
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    if (pathname === '/') {
      return NextResponse.rewrite(new URL(`/vh/${subdomain}`, req.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next|[\\w-]+\\.\\w+).*)'],
};