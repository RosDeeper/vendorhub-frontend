import { DM_Sans } from "next/font/google";
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { Suspense } from "react";

import { 
  DialogProvider, 
  QueryProvider,
  ToastProvider,
  ThemeProvider,
  SidebarProvider,
} from "@/components/providers";
import { AnimatedBackground } from "@/components/common/animation";

import '@/src/constants/styles/globals.css';

type Props = {
 children: React.ReactNode;
};

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: 'VendorHub'
};

const RootLayout = async ({ children }: Props) => {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={dmSans.variable}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <QueryProvider>
              <DialogProvider>
                {/* <SidebarProvider> */}
                  <AnimatedBackground />
                  <Suspense fallback={null}>
                    {children}
                  </Suspense>
                  <ToastProvider />
                {/* </SidebarProvider> */}
              </DialogProvider>
            </QueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
