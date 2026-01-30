'use client';

import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";

import { SYS_TYPE } from "@/src/constants/path";

const backgroundImage: React.CSSProperties = {
  background: `
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/assets/images/background-image.png') center / 100% 100% no-repeat
  `,
  position: 'fixed',
  opacity: 1,
  inset: 0,
  zIndex: -1,
};

export const AnimatedBackground = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const isCollapsed = 
    type === SYS_TYPE.SIGN_UP || 
    type === SYS_TYPE.FORGET_PASSWORD;

  return (
    <motion.div
      animate={{ 
        clipPath: isCollapsed ? 'inset(0 50% 0 0)' : 'inset(0 0% 0 0)',
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={backgroundImage}
    />
  );
};
