/* eslint-disable prefer-const */
'use server';

import { rootDomain } from '@/lib';
import setCookieParser from 'set-cookie-parser';

const BE_API = process.env.NEXT_PUBLIC_BACKEND_API_URL;

type ApiOptions<TPayload = unknown> = {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  payload?: TPayload;
  headers?: Record<string, string>;
};

export const apiAuthClient = async <TResponse, TPayload = unknown>({
  endpoint,
  method = 'POST',
  payload,
  headers = {},
}: ApiOptions<TPayload>): Promise<TResponse> => {
  const url = `${BE_API}${endpoint}`;
  const isServer = typeof window === 'undefined';

  let authHeaders: Record<string, string> = { ...headers };

  if (isServer) {
    const { cookies: nextCookies } = await import('next/headers');
    const cookieStore = await nextCookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (accessToken) authHeaders['Authorization'] = `Bearer ${accessToken}`;
    if (refreshToken) authHeaders['Cookie'] = `refreshToken=${refreshToken}`;
  }
  
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
    },
    credentials: 'include',
    body: payload ? JSON.stringify(payload) : undefined,
  });

  if (isServer) {
    const setCookieHeader = response.headers.getSetCookie();

    if (setCookieHeader?.length > 0) {
      const { cookies: nextCookies } = await import('next/headers');
      const cookieStore = await nextCookies();

      const parsedCookies = setCookieParser.parse(setCookieHeader);

      parsedCookies.forEach((cookie) => {
        cookieStore.set(cookie.name, cookie.value, {
          path: cookie.path || '/',
          httpOnly: cookie.httpOnly,
          sameSite: 'lax',
          maxAge: cookie.maxAge,
          secure: cookie.secure || process.env.NODE_ENV === 'production',
          domain: process.env.NODE_ENV === 'development' 
            ? '.vh.local'
            : `.${rootDomain}`
        });
      });
    }
  }
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data?.message || 'Request failed');
  }

  return data as TResponse;
};
