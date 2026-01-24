'use client';

import { OTPInput, OTPInputContext } from "input-otp";
import { useContext } from "react";
import { Dot } from "lucide-react"

import { cn } from "@/lib";

const InputOTP = ({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) => {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50 justify-evenly",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
};

const InputOTPGroup = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
};

const InputOTPSlot = ({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & { index: number }) => {
  const inputOTPContext = useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex size-12 items-center justify-center border-y-2 border-r-2",
        "border-[#D2D2D2] bg-secondary-background text-sm font-base text-foreground",
        "first:rounded-l-base first:border-l-2 last:rounded-r-base transition-all",
        "text-2xl font-semibold",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-px animate-caret-blink bg-[#3A86FF] duration-1000" />
        </div>
      )}
    </div>
  )
};

const InputOTPSeparator = ({ ...props }: React.ComponentProps<"div">) => {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <Dot className="size-4" />
    </div>
  )
};

export { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
};
