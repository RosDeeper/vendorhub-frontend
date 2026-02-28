'use client';

import React from "react";
import { Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";

import { FormControl, FormItem, FormField } from "../Form/lib-ui";
import { Textarea } from "./lib-ui";
import { cn } from "@/lib";

type FormTextareaProps = React.ComponentProps<'textarea'> & {
  name: string;
  label?: string;
  description?: string;
  className?: string;
};

export const FormTextarea = ({
  name,
  label,
  description,
  className,
  ...props
}: FormTextareaProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const error = fieldState?.error?.message;

        return (
          <FormItem>
            {label && (
              <div className="flex gap-1">
                <span className="font-bold text-[#2C3E50] tracking-[1px]">{label}</span>
                {props.required ? <span style={{ color: 'red' }}>*</span> : null}
              </div>
            )}
            <FormControl>
              <Textarea
                {...field}
                {...props}
                className={cn(
                  error ? "border-red-500" : "border-none",
                  className
                )}
              />
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
