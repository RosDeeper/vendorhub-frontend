'use client';

import { useEffect } from 'react';
import { protocol, rootDomain } from '@/lib';

/**
 * Callback sau khi BE xử lý Google OAuth xong và redirect về đây.
 * BE set cookie (accessToken/refreshToken) rồi redirect tới URL này.
 * Redirect tiếp sang dashboard để user vào app.
 */
export default function AuthCallbackPage() {
  useEffect(() => {
    const targetUrl = `${protocol}://test.${rootDomain}/dashboard`;
    window.location.replace(targetUrl);
  }, []);

  return null;
}
