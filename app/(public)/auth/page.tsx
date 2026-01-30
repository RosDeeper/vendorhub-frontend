'use client';

import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

import { LoginPage, SignUpPage, ForgetPassword } from "@/src/containers/Authen";
import { containerVariants } from "@/components/common/animation";
import { SYS_TYPE } from "@/src/constants/path";

import '../styles.scss';

const X = () => {
  const searchParams = useSearchParams();

  const typeFromUrl = searchParams.get("type") as (typeof SYS_TYPE)[keyof typeof SYS_TYPE];

  const renderTab = () => {
    switch (typeFromUrl) {
      case SYS_TYPE.LOGIN:
        return <LoginPage />;
      case SYS_TYPE.SIGN_UP:
        return <SignUpPage />;
      case SYS_TYPE.FORGET_PASSWORD:
        return <ForgetPassword />;
      default: return <></>;
    };
  };

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={typeFromUrl}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {renderTab()}
      </motion.div>
    </AnimatePresence>
  );
};

export default X;
