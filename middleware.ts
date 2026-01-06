import { NextRequest, NextResponse } from "next/server";

import { PUBLIC_PATHS } from "./src/constants/path";
import { rootDomain } from "./lib";

const isPublicPath = (pathname: string) => {
  return PUBLIC_PATHS?.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
};

function extractSubdomain(req: NextRequest): string | null {
  const url = req.url;
  const host = req.headers.get('host');

  if (!host) return null;

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
}

export function middleware(req: NextRequest) {
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
    if (pathname.startsWith('/vh')) {
      return NextResponse.next();
    }

    return NextResponse.rewrite(
      new URL(`/vh/${subdomain}${pathname}`, req.url)
    );
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next|[\\w-]+\\.\\w+).*)'],
};