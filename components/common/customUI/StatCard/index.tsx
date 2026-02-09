/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect } from "react";
import { 
  useMotionValue, 
  useTransform,
  animate,
  motion
} from "motion/react";
import { IconType } from "react-icons/lib";

import { cn } from "@/lib";
import { statusVariants } from "./helpers";

type Props = {
  title: string;
  data: number;
  icon: IconType;
  variant?: "default" | "success" | "warning" | "info" | "danger",
};

export const StatCard = (props: Props) => {
  const { title, data, icon: Icon, variant = 'default' } = props;

  const config = statusVariants[variant];

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(
      count, 
      data, 
      { duration: 1.5, ease: 'easeOut' },
    );

    return controls.stop;
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        'bg-white rounded-xl border-l-[5px] flex justify-between items-center',
        config.border
      )}
      style={{
        padding: '12px',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      }}
    >
      <div className="flex flex-col">
        <span className="text-[14px] font-medium text-slate-500">{title}</span>
        <motion.h3 className={`text-[20px] font-bold ${config.color}`}>
          {rounded}
        </motion.h3>
      </div>

      <div className={cn(
        'p-2! rounded-full flex items-center justify-center',
        config.bg
      )}>
        <Icon size={24} color={config.iconColor} />
      </div>
    </motion.div>
  );
}; 
