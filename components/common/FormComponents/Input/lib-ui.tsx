'use client';

import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib";

const LibLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) => {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none",
        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};

const LibInput = ({ 
  className, 
  type, 
  variant,
  ...props 
}: React.ComponentProps<"input"> & { variant?: 'glass' | 'light' }) => {
  return (
    <input
      type={type}
      data-slot="input"
      // className={cn(
      //   "flex h-11 rounded-base w-full selection:bg-white tracking-[1]",
      //   "selection:text-main-foreground text-sm font-base text-white",
      //   "file:border-0 file:bg-transparent file:text-sm file:font-heading",
      //   "placeholder:text-white/50 focus-visible:outline-hidden focus-visible:ring-black",
      //   "focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-200",
      //   className,
      // )}
      className={cn(
        "flex h-11 w-full tracking-[1] bg-transparent outline-none text-sm transition-colors",
        "selection:bg-white selection:text-main-foreground",
        "file:border-0 file:bg-transparent file:text-sm file:font-heading",
        "disabled:cursor-not-allowed",
        variant === 'glass' 
          ? "text-white placeholder:text-white/50" 
          : "text-gray-800 placeholder:text-gray-400",
        className
      )}
      {...props}
    />
  );
};

export { LibLabel, LibInput };
