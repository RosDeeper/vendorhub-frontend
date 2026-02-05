'use client';

import { Stack } from "@mui/material";
import { motion } from "motion/react";

import { Header, Sidebar } from "@/src/containers/Home";
import { 
  commonMotionProps, 
  navVariants, 
  sidebarVariants 
} from "@/components/common/animation";

import './styles.scss';

type Props = {
 children: React.ReactNode;
};

const HomeLayout = ({ children }: Props) => {
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
