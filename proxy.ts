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

  // Check vh.local (Development)
  if (hostname.endsWith('.vh.local')) {
    return hostname.replace('.vh.local', '');
  }

  // Check Production
  if (hostname.endsWith(`.${rootDomain}`) && hostname !== rootDomain) {
    return hostname.replace(`.${rootDomain}`, '');
  }

  return null;
};

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const subdomain = extractSubdomain(req);
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const locale = req.cookies.get('NEXT_LOCALE')?.value || routing.defaultLocale;

  // Check Public Path
  const isPublicPath = PUBLIC_PATHS?.some((path) => {
    if (path === SYS_PATHS.root) return pathname === SYS_PATHS.root;

    return pathname === path || pathname.startsWith(`${path}/`);
  });

  if (subdomain) {
    // Without authentication
    if (!refreshToken) {
      return NextResponse.redirect(`${protocol}://${rootDomain}${SYS_PATHS.root}`);
    }
    
    // With authentication but try login page
    if (isPublicPath) {
       return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return applyLocale(NextResponse.next(), locale);
  }

  if (!subdomain) {
    // Authenticated but in login page
    if (refreshToken && isPublicPath) {
      return NextResponse.redirect(`${protocol}://test.${rootDomain}/dashboard`);
    }

    // Non-authenticated but try tenant page
    if (!refreshToken && !isPublicPath) {
      return NextResponse.redirect(`${protocol}://${rootDomain}${SYS_PATHS.root}`);
    }
  }

  return applyLocale(NextResponse.next(), locale);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)',
  ],
};