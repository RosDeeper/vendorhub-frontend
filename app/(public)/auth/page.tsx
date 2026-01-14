'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, Variants, stagger } from "motion/react";

import { LoginPage, SignUpPage } from "@/src/containers/Authen";

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.2
      } 
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.2
      } 
    }
  };

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
