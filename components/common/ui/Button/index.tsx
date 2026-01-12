import { Stack, Typography } from "@mui/material";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib";
import { FONT_WEIGHT, TEXT_SIZE } from "@/src/constants/text";

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        primary:
          "bg-[#8394FF] text-white shadow-[0_6px_16px_rgba(131,148,255,0.35)] \
          hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(131,148,255,0.45)]",
        secondary:
          "bg-[#EDEDED] text-[#3A3A3A] shadow-[0_6px_16px_rgba(0,0,0,0.15)] \
          hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.22)]",
        ghost:
          "bg-transparent text-white hover:bg-white/10",
      },
      size: {
        default: "h-11 px-8",
        sm: "h-9 px-6 text-xs",
        lg: "h-12 px-10 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

type ButtonProps = 
  React.ComponentProps<"button"> & 
  VariantProps<typeof buttonVariants> & 
  {
    asChild?: boolean,
    label?: string;
    startIcon?: React.ReactNode,
    endIcon?: React.ReactNode,
    isLoading?: boolean,
  }

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  label,
  startIcon,
  endIcon,
  isLoading = false,
  children,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {isLoading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <Stack direction='row' alignItems='center' gap={1}>
          {startIcon && <span className="inline-flex">{startIcon}</span>}
          <Typography sx={{ 
            fontWeight: FONT_WEIGHT.SEMIBOLD,
            fontSize: TEXT_SIZE.BASE,
          }}>
            {label || children}
          </Typography>
          {endIcon && <span className="inline-flex">{endIcon}</span>}
        </Stack>
      )}
    </Comp>
  )
}

export { Button, buttonVariants };
