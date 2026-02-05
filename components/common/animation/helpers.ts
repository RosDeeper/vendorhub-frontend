import { Variants } from "motion/react";

export const commonMotionProps = {
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
};

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0,transition: { duration: 0.2 } }
};

export const formVariants: Variants = {
  hidden: { x: 500, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.2 } },
  exit: { x: 500, opacity: 0, transition: { duration: 0.2 } }
};

export const navVariants: Variants = {
  hidden: { y: -100 },
  visible: { y: 0, transition: { duration: 0.2 } },
  exit: { y: -100, transition: { duration: 0.2 } }
};

export const heroVariants: Variants = {
  hidden: { y: 100 },
  visible: { y: 0, transition: { duration: 0.2 } },
  exit: { y: 100, transition: { duration: 0.2 } }
};

export const sidebarVariants: Variants = {
  hidden: { x: -160 },
  visible: { x: 0, transition: { duration: 0.2 } },
  exit: { x: -160, transition: { duration: 0.2 } }
};
