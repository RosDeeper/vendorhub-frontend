import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

import { rootDomain } from "./lib";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  rewrites: async () => ({
    beforeFiles: [
      {
        source: '/:path((?!_next|_static|_vercel|.well-known|.*\\.\\w+$).*)*',
        has: [
          {
            type: 'host',
            value: `(?<slug>.*).${rootDomain}`,
          },
        ],
        destination: '/vh/:slug/:path*',
      },
      {
        source: '/:path((?!_next|_static|_vercel|.well-known|.*\\.\\w+$).*)*',
        has: [
          {
            type: 'host',
            value: `${rootDomain}`,
          },
        ],
        destination: '/:path*',
      },
    ],
  }),
};

export default withNextIntl(nextConfig);
