import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  rewrites: async () => ({
    beforeFiles: [
      {
        source: '/:path((?!_next|_static|_vercel|.well-known|.*\\.\\w+$).*)*',
        has: [
          {
            type: 'host',
            value: '(?<slug>[^.]+)\\.vh\\.local(?::\\d+)?',
          },
        ],
        destination: '/vh/:slug/:path*',
      },
      {
        source: '/:path((?!_next|_static|_vercel|.well-known|.*\\.\\w+$).*)*',
        has: [
          {
            type: 'host',
            value: 'vh\\.local(?::\\d+)?',
          },
        ],
        destination: '/:path*',
      },
    ],
  }),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**'
      }
    ],
  },
};

export default withNextIntl(nextConfig);
