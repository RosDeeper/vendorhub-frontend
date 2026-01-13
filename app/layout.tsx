import { DM_Sans } from "next/font/google";
import type { Metadata } from "next";

import { 
  DialogProvider, 
  QueryProvider,
  ToastProvider,
  ThemeProvider,
  SidebarProvider,
} from "@/components/providers";

import '@/src/constants/styles/globals.css';

type Props = {
 children: React.ReactNode;
};

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
});

const backgroundImage: React.CSSProperties = {
  background: `
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/assets/background-image.png') center / 100% 100% no-repeat
  `,
  position: 'fixed',
  opacity: 1,
  inset: 0,
  zIndex: -1,
};

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
                <div style={backgroundImage} />
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
