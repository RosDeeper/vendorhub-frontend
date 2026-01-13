'use client';

import { Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import React, { useState } from "react";
import { PiEye, PiEyeClosed } from "react-icons/pi";

import { cn } from "@/lib/utils";
import { FormControl, FormField, FormItem } from "@/components/ui";
import { LibInput, LibLabel } from "./lib-ui";

type InputProps = React.ComponentProps<"input"> & {
  label?: string;
  startIcon?: React.ReactNode;
  error?: string; 
  variant?: 'glass' | 'light';
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      name,
      placeholder,
      type = 'text',
      startIcon,
      required,
      error,
      variant = 'glass',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
      <Stack direction='column' gap={1}>
        {(label) && (
          <Stack direction='row' justifyContent='space-between'>
            <LibLabel 
              htmlFor={name} 
              className={cn(
                'font-bold',
                variant === 'glass' ? "text-white" : "text-gray-700"
              )}>
              {label}
              {required ? <span style={{ color: 'red' }}>*</span> : null}
            </LibLabel>
          </Stack>
        )}

        <Stack 
          direction='row' 
          alignItems='center' 
          gap={2}
          px={2}
          style={{
            backdropFilter: 'blur(20px)',
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3), 0 4px 15px rgba(0, 0, 0, 0.1)',
          }}
          className={cn(
            "rounded-full transition-all duration-300",
            variant === 'glass' && [
              "bg-white/10 border-white/10 backdrop-blur-[15px]",
              "shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_4px_15px_rgba(0,0,0,0.1)]",
              "focus-within:bg-white/32"
            ],
            variant === 'light' && [
              "bg-white border-gray-200 shadow-sm",
              "focus-within:shadow-md"
            ],
            error ? "border-red-500" : "",
            props?.disabled ? 'bg-gray-200' : ''
          )}
        >
          {startIcon && (
            <span 
              className={cn(
                "inline-flex",
                variant === 'glass' ? "text-white/70" : "text-gray-500"
              )}
            >
              {startIcon}
            </span>
          )}

          <LibInput 
            ref={ref}
            id={name} 
            type={isPassword ? (showPassword ? 'text' : 'password') : type}
            name={name} 
            variant={variant}
            placeholder={placeholder}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="pr-4 focus:outline-none cursor-pointer"
            >
              {!showPassword ? (
                <PiEyeClosed 
                  size={18} 
                  className={cn(
                    "transition-colors ",
                    variant === 'glass' ? "text-white" : "text-black" 
                  )} 
                />
              ) : (
                <PiEye 
                  size={18} 
                  className={cn(
                    "transition-colors",
                    variant === 'glass' ? "text-white" : "text-black" 
                  )} 
                />
              )}
            </button>
          )}
        </Stack>

        {error && (
          <span className="text-xs text-red-500">{error}</span>
        )}
      </Stack>
    );
  }
);
Input.displayName = 'Input';

// FORM //
type FormInputProps = InputProps & {
  name: string;
};

export const FormInput = ({ name, ...props }: FormInputProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <Input
              {...field}
              {...props}
              error={fieldState.error?.message}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
