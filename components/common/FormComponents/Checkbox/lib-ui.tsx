'use client';

import { forwardRef } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib";

export const LibCheckbox = forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & { variant?: 'glass' | 'light'}
>(({ className, variant, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox"
      className={cn(
        "peer size-4 rounded-[4] bg-white/10 ring-offset-white",
        "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black",
        "focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-white/32 data-[state=checked]:text-white",
        "shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_4px_15px_rgba(0,0,0,0.1)]",
        props?.disabled && 'bg-gray-200',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
      >
        <CheckIcon className={cn(
          'size-3.5',
          variant === 'glass' ? 'text-white' : 'text-black'
        )} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
});
LibCheckbox.displayName = "LibCheckbox";
