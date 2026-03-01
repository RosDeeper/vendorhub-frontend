'use client';

import { useFormContext } from "react-hook-form";
import { Stack } from "@mui/material";

import { FormField, FormControl, FormItem } from "../Form/lib-ui";
import { LibRadioGroup, RadioGroupItem } from "./lib-ui";
import { cn } from "@/lib/utils";

type RadioOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type RadioGroupProps = {
  name: string;
  label?: string;
  description?: string
  options: RadioOption[];
  className?: string;
  disabled?: boolean;
  required?: boolean;
};

export const FormRadioGroup = ({
  name,
  label,
  description,
  options,
  className,
  disabled = false, 
  required = false, 
}: RadioGroupProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const error = fieldState?.error?.message;

        return (
          <FormItem className="@container">
            {label && (
              <div className="flex gap-1">
                <span className="font-bold text-[#2C3E50] tracking-[1px]">{label}</span>
                {required ? <span style={{ color: 'red' }}>*</span> : null}
              </div>
            )}

            <FormControl>
              <LibRadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={disabled}
                className={cn(
                  "flex justify-between",
                  options.length > 3 ? "flex-col" : "flex-row",
                  className
                )}
              >
                {options.map((option) => {
                  return (
                    <Stack 
                      key={option.value} 
                      direction="row" 
                      alignItems="center" 
                      gap={1}
                    >
                      <RadioGroupItem 
                        id={`${name}-${option.value}`}
                        value={option.value}
                        disabled={disabled || option.disabled}
                      />
                      <label 
                        htmlFor={`${name}-${option.value}`}
                        className={cn(
                          "cursor-pointer text-[#2c3e50] font-base tracking-[1px]",
                          (disabled || option.disabled) && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        {option.label}
                      </label>
                    </Stack>
                  );
                })}
              </LibRadioGroup>
            </FormControl>

            <Stack>
              {description && (
                <span className="text-xs font-medium text-gray-400 italic">{description}</span>
              )}
              {error && (
                <span className="text-xs text-red-500">{error}</span>
              )}
            </Stack>
          </FormItem>
        );
      }}
    />
  );
};
