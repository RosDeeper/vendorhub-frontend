'use client';

import { FieldValues, Path, useFormContext } from "react-hook-form";
import { useState } from "react";
import { Stack } from "@mui/material";
import { Check } from "lucide-react";
import { FiChevronDown, FiX } from "react-icons/fi";

import { cn } from "@/lib";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../Select/lib-ui";
import { FormControl, FormField, FormItem } from "../Form/lib-ui";

type Option = {
  label: string;
  value: string;
};

type MultiSelectProps<T extends FieldValues> = {
  name?: Path<T>;
  label?: string;
  placeholder?: string;
  options: Option[];
  disabled?: boolean;
  searchable?: boolean;
  required?: boolean;
  value?: string[];
  onChange?: (value: string[]) => void;
};

export const FormMultiSelect = <T extends FieldValues>({
  name,
  label,
  placeholder = "Select...",
  options,
  disabled,
  required,
  searchable = false,
  value: manualValue,
  onChange: manualOnChange,
}: MultiSelectProps<T>) => {
  const formContext = useFormContext<T>();
  const [open, setOpen] = useState(false);

  const renderMultiSelect = (
    currentValue: string[] | undefined, 
    onValueChange: (val: string[]) => void
  ) => {
    const values = Array.isArray(currentValue) ? currentValue : [];

    const toggleOption = (val: string) => {
      const isSelected = values.includes(val);
      const nextValues = isSelected
        ? values.filter((item) => item !== val)
        : [...values, val];

      onValueChange(nextValues);
    };

    return (
      <FormItem>
        <Stack direction='column' gap={1}>
          <div className="flex gap-1">
            {label && (
              <span className="font-bold text-[#2C3E50] tracking-[1px]">{label}</span>
            )}
            {required ? <span style={{ color: 'red' }}>*</span> : null}
          </div>

          <Popover 
            open={open} 
            onOpenChange={(v) => {
              if (disabled) return;
              setOpen(v);
            }}
          >
            <PopoverTrigger asChild>
              <FormControl>
                <Stack 
                  className={cn(
                    "rounded-full bg-white cursor-pointer shadow-md",
                    disabled && "bg-gray-200"
                  )}
                  style={{ padding: '0 12px' }}
                >
                  <div className="flex h-10 justify-between items-center">
                    <div className="flex flex-1 gap-2">
                      {values.length > 0 ? (
                        values.map((v) => {
                          const option = options?.find((opt) => opt.value === v);

                          return (
                            <Stack 
                              key={v} 
                              direction='row' 
                              alignItems='center' 
                              gap={1}
                              style={{
                                backgroundColor: '#2C3E50',
                                borderRadius: '99px',
                                padding: '2px 6px'
                              }}
                            >
                              <span className="text-[#eff2f4] text-sm font-medium">
                                {option?.label || v}
                              </span>
                              {!disabled && (
                                <FiX
                                  className="cursor-pointer text-[#eff2f4]"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleOption(v);
                                  }}
                                />
                              )}
                            </Stack>
                          );
                        })
                      ) : (
                        <span className="font-base text-[#7f7f7f] tracking-[1px]">
                          {placeholder}
                        </span>
                      )}
                    </div>
                    <FiChevronDown size={16} />
                  </div>
                </Stack>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className="p-0 w-(--radix-popover-trigger-width)">
              <Command className="bg-white rounded-base! border-none">
                {searchable && (
                  <CommandInput placeholder="Search..." />
                )}

                <CommandEmpty>
                  <span className="leading-9">
                    No data
                  </span>
                </CommandEmpty>

                {options.length !== 0 && (
                  <CommandList>
                    <CommandGroup>
                      {options.map((opt) => {
                        const isSelected = values.includes(opt.value);

                        return (
                          <CommandItem
                            key={opt.value}
                            onSelect={() => toggleOption(opt.value)}
                          >
                            <span>{opt.label}</span>
                            {isSelected && (
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4 opacity-100",
                                )}
                              />
                            )}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                )}
              </Command>
            </PopoverContent>
          </Popover>
        </Stack>
      </FormItem>
    );
  };

  if (name && formContext) {
    return (
      <FormField
        control={formContext.control}
        name={name}
        render={({ field }) => renderMultiSelect(field.value, field.onChange)}
      />
    );
  }

  return renderMultiSelect(manualValue, manualOnChange || (() => {}));
};
