'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

import { LoginPage, SignUpPage } from "@/src/containers/Authen";
import { containerVariants } from "@/components/common/animation";

import '../styles.scss';

const tabs = [
  { label: 'LOGIN', value: 'login' },
  { label: 'SIGN UP', value: 'signup' },
];

const X = () => {
  const searchParams = useSearchParams();

  const typeFromUrl = searchParams.get("type") as "login" | "signup";

  const [currentTab, setCurrentTab] = useState<string>(
    typeFromUrl ?? tabs[0].value
  );

  const renderTab = () => {
    switch (currentTab) {
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignUpPage />;
      default: return <></>;
    };
  };

  useEffect(() => {
    setCurrentTab(typeFromUrl ?? tabs[0].value);
  }, [typeFromUrl])

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={currentTab}
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
