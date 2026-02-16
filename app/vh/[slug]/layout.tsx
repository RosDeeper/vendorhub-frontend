/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Stack } from "@mui/material";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { setTimeout } from "timers";
import Cookies from "universal-cookie";

import { Header, Sidebar } from "@/src/containers/Home";
import { 
  commonMotionProps, 
  navVariants, 
  sidebarVariants 
} from "@/components/common/animation";
import { CustomLoading } from "@/components/common";
import { rootDomain } from "@/lib";

import { useRefreshToken } from "@/src/queries";

import './styles.scss';

type Props = {
 children: React.ReactNode;
};

const HomeLayout = ({ children }: Props) => {
  const cookie = new Cookies();
  const [isAuthReady, setIsAuthReady] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

   const getRefreshDelay = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const expireTime = payload.exp * 1000;
      const currentTime = Date.now();

      return expireTime - currentTime - 30000;
    } catch {
      return 270000;
    }
  };

  const { mutate: refreshToken } = useRefreshToken({
    onSuccess(data) {
      const accessToken = data?.accessToken;
      const delay = getRefreshDelay(accessToken);

      if (timerRef.current) clearTimeout(timerRef.current);

      cookie.set('accessToken', accessToken, { 
        path: '/', 
        sameSite: 'lax',
        maxAge: 300,
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'development' 
          ? '.vh.local'
          : `.${rootDomain}`,
      });

      timerRef.current = setTimeout(() => refreshToken(), delay);
      setIsAuthReady(true);
    },
  });

  useEffect(() => {
    const accessToken = cookie.get('accessToken');

    if (!accessToken) {
      refreshToken();
    } else {
      setIsAuthReady(true);

      if (!timerRef.current) {
        const delay = getRefreshDelay(accessToken);
        timerRef.current = setTimeout(() => refreshToken(), delay);
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  if (!isAuthReady) {
    return <CustomLoading />;
  }

  return (
    <Stack>
      {/* Header */}
      <motion.div 
        variants={navVariants}
        {...commonMotionProps}
      >
        <Header />
      </motion.div>

      <Stack className="home-body" gap={4}>
        {/* Sidebar */}
        <motion.div 
          variants={sidebarVariants}
          {...commonMotionProps}  
        >
          <Sidebar />
        </motion.div>

        <Stack 
          marginTop='12px'
          style={{ flex: 1, marginRight: '20px' }}
        >
          {children}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HomeLayout;
