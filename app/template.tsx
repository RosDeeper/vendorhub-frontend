'use client';

import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';

const Template = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode='wait'>
      <motion.div key={pathname}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Template;
