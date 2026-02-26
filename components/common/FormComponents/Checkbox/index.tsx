"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { LibCheckbox } from "./lib-ui";
import { FormControl, FormField, FormItem } from "../Form/lib-ui";

type CheckboxFieldProps = {
  label?: React.ReactNode,
  error?: string,
  variant?: 'glass' | 'light';
} & React.ComponentPropsWithoutRef<typeof LibCheckbox>

export const Checkbox = React.forwardRef<
  React.ComponentRef<typeof LibCheckbox>,
  CheckboxFieldProps
>(({ label, error, variant = 'glass', ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-center gap-2 cursor-pointer">
        <LibCheckbox ref={ref} variant={variant} {...props} />
        <span className={cn(
          "text-sm text-[#2C3E50] font-semibold select-none",
          props?.disabled && 'opacity-50'
        )}>
          {label}
        </span>
      </label>

      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  )
});
Checkbox.displayName = "Checkbox";

// FORM //
type FormCheckboxProps = CheckboxFieldProps & {
  name: string,
  label?: React.ReactNode,
};

export const FormCheckbox = ({ name, label, ...props }: FormCheckboxProps) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <Checkbox
              label={label}
              {...field}
              {...props}
              error={fieldState.error?.message}
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
};
