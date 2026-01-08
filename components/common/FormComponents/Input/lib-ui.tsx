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
  ...props 
}: React.ComponentProps<"input">) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-base bg-secondary-background selection:bg-main",
        "selection:text-main-foreground px-3 py-2 text-sm font-base text-foreground",
        "file:border-0 file:bg-transparent file:text-sm file:font-heading",
        "placeholder:text-foreground/50 focus-visible:outline-hidden focus-visible:ring-black",
        "focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-200",
        className,
      )}
      {...props}
    />
  );
};

export { LibLabel, LibInput };
