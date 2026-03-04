import { Stack, Typography } from "@mui/material";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib";
import { FONT_WEIGHT, TEXT_SIZE } from "@/src/constants/text";

const buttonVariants = cva(
  `
    inline-flex items-center cursor-pointer justify-center whitespace-nowrap
    text-sm font-medium transition-all duration-200 focus-visible:outline-none 
    focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
    disabled:pointer-events-none disabled:opacity-50 active:scale-95 rounded-xl
  `,
  {
    variants: {
      variant: {
        primary:
          "bg-[#2C3E50] text-[#EFF2F4] \
          shadow-[0_4px_6px_rgba(0,0,0,0.4)] hover:translate-y-0.5",
        secondary:
          "bg-[#DFDADA] text-black \
          shadow-[0_4px_6px_rgba(0,0,0,0.4)] hover:translate-y-0.5",
        outline: 
          'bg-transparent text-[#2C3E50]  border border-[#2C3E50] \
          shadow-[0_4px_6px_rgba(0,0,0,0.4)] hover:translate-y-0.5',
        ghost:
          "bg-transparent text-[#2C3E50]",
        default: "text-main-foreground bg-main hover:translate-x-boxShadowX hover:translate-y-boxShadowY", 
      },
      size: { 
        default: "h-10 px-4 py-2", 
        sm: "h-9 px-3", 
        lg: "h-11 px-8", 
        icon: "size-10 rounded-full", 
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
        <Stack direction='row' alignItems='center' gap={size === 'icon' ? 0 : 1}>
          {startIcon && <span className="inline-flex">{startIcon}</span>}
          <Typography sx={{ 
            fontWeight: FONT_WEIGHT.SEMIBOLD,
            fontSize: TEXT_SIZE.SM,
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
