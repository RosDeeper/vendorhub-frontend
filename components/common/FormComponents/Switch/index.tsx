'use client';

import { FieldValues, Path, useFormContext } from "react-hook-form";
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { Stack } from "@mui/material";

import { 
  FormField,
  FormControl,
  FormItem
} from "@/components/ui";
import { Switch } from "./lib-ui";

type FormSwitchProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  description?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  classname?: string;
} & Omit<React.ComponentProps<typeof SwitchPrimitive.Root>, 'checked' | 'onCheckedChange'>;

export const FormSwitch = <T extends FieldValues>({
  name,
  label,
  description,
  checked: controlledChecked,
  onCheckedChange: controlledOnChange,
  ...props
}: FormSwitchProps<T>) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const error = fieldState.error?.message;

        return (
          <FormItem>
            <Stack gap={1}>
              {label && (
                <div className="flex gap-1">
                  <span className="font-bold text-[#2C3E50] tracking-[1px]">{label}</span>
                  {props.required ? <span style={{ color: 'red' }}>*</span> : null}
                </div>
              )}

              <FormControl>
                <Switch
                  checked={controlledChecked ?? field.value}
                  onCheckedChange={(val) => {
                    field.onChange(val);
                    controlledOnChange?.(val);
                  }}
                  {...props}
                />
              </FormControl>
            </Stack>
            
            {description && (
              <span className="text-xs font-medium text-gray-400 italic">{description}</span>
            )}
            {error && (
              <span className="text-xs text-red-500">{error}</span>
            )}
          </FormItem>
        );
      }}
    />
  );
};
