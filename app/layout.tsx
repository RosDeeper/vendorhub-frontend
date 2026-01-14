import { DM_Sans } from "next/font/google";
import type { Metadata } from "next";
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

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>
        <ThemeProvider>
          <QueryProvider>
            <DialogProvider>
              {/* <SidebarProvider> */}
                <Suspense fallback={null}>
                  <AnimatedBackground />
                </Suspense>
                {children}
                <ToastProvider />
              {/* </SidebarProvider> */}
            </DialogProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
