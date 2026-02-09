import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

export const Switch = ({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) => {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "data-[state=checked]:bg-[#2C3E50] data-[state=unchecked]:bg-white",
        "w-10 h-6 items-center rounded-full",
        "transition-all cursor-pointer",
        "disabled:cursor-not-allowed disabled:opacity-50 shadow-md",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-[#2C3E50] pointer-events-none",
          "block size-4 rounded-full transition-transform",
          "data-[state=checked]:bg-[#EFF2F4]",
          "data-[state=checked]:translate-x-[calc(100%+6px)] data-[state=unchecked]:translate-x-0.5"
        )}
      />
    </SwitchPrimitive.Root>
  )
};
