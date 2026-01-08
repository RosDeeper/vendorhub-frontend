'use client';

import { Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import React from "react";

import { cn } from "@/lib/utils";
import { TEXT_SIZE, FONT_WEIGHT } from "@/src/constants/text";
import { FormControl, FormField, FormItem } from "@/components/ui";
import { LibInput, LibLabel } from "./lib-ui";

type InputProps = React.ComponentProps<"input"> & {
  label?: string;
  startIcon?: React.ReactNode;
  error?: string; 
  includeForgetPass?: boolean;
  handleForgetPassword?: () => void;
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
      includeForgetPass,
      handleForgetPassword,
      ...props
    },
    ref
  ) => {
    return (
      <Stack direction='column' gap={1}>
        {(label || includeForgetPass) && (
          <Stack direction='row' justifyContent='space-between'>
            <LibLabel htmlFor={name} className="font-bold">
              {label}
              {required ? <span style={{ color: 'red' }}>*</span> : null}
            </LibLabel>

            {includeForgetPass && (
              <p
                style={{
                  fontSize: TEXT_SIZE.SM,
                  fontWeight: FONT_WEIGHT.MEDIUM,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                onClick={handleForgetPassword}
              >
                Forgot your password?
              </p>
            )}
          </Stack>
        )}

        <Stack 
          direction='row' 
          alignItems='center' 
          gap={2}
          px={1}
          className={cn(
            "rounded-base border-2 bg-secondary-background",
            error ? "border-red-500" : "border-border",
            props?.disabled ? 'bg-gray-200' : '',
          )}
        >
          {startIcon && <span className="inline-flex">{startIcon}</span>}

          <LibInput 
            ref={ref}
            type={type} 
            id={name} 
            name={name} 
            placeholder={placeholder}
            {...props}
          />
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
