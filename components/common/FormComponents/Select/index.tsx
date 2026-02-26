'use client';

import { FieldValues, Path, useFormContext } from "react-hook-form";
import { useState } from "react";
import { Stack } from "@mui/material";
import { Check } from "lucide-react";
import { FiChevronDown } from "react-icons/fi";

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
} from "./lib-ui";
import { FormControl, FormField, FormItem } from "../Form/lib-ui";

type Option = {
  label: string;
  value: string;
};

type BaseSelectProps = {
  label?: string;
  placeholder?: string;
  required?: boolean;
  options: Option[];
  disabled?: boolean;
  searchable?: boolean;
  isTimePicker?: boolean;
};

type StandaloneSelectProps = BaseSelectProps & {
  name?: never;
  value?: string;
  onChange?: (value: string) => void;
};

type FormSelectProps<T extends FieldValues> = BaseSelectProps & {
  name: Path<T>;
  value?: never; 
  onChange?: never;
}

type SelectProps<T extends FieldValues> = StandaloneSelectProps | FormSelectProps<T>;

export const FormSelect = <T extends FieldValues>({
  name,
  label,
  placeholder = "Select...",
  options,
  disabled,
  required,
  isTimePicker,
  searchable = false,
  value: manualValue,
  onChange: manualOnChange,
}: SelectProps<T>) => {
  const formContext = useFormContext<T>();
  const [open, setOpen] = useState(false);

  const renderSelect = (
    currentValue: string, 
    onValueChange: (val: string) => void
  ) => {
    const selected = options.find((opt) => opt.value === currentValue);

    return (
      <FormItem>
        <Stack direction='column'>
          {label && (
            <div className="flex gap-1 mb-1!">
              <span className="font-bold text-[#2C3E50] tracking-[1px]">{label}</span>
              {required ? <span style={{ color: 'red' }}>*</span> : null}
            </div>
          )}

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
                    "rounded-full bg-white cursor-pointer",
                    !isTimePicker && 'shadow-md',
                    disabled && "bg-gray-200"
                  )}
                  style={{ padding: '0 12px' }}
                >
                  <div className="flex h-10 justify-between items-center">
                    {selected?.label ? (
                      <span className="font-base text-black">
                        {selected?.label}
                      </span>
                    ) : (
                      <span className="font-base text-[#7f7f7f] tracking-[1px]">
                        {placeholder}
                      </span>
                    )}
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
                    <CommandGroup  className="custom-scrollbar">
                      {options.map((opt) => (
                        <CommandItem
                          key={opt.value}
                          onSelect={() => {
                            onValueChange(opt.value);
                            setOpen(false);
                          }}
                        >
                          <span>
                            {opt.label}
                          </span>
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              opt.value === currentValue
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
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
        render={({ field }) => renderSelect(field.value, field.onChange)}
      />
    );
  }

  return renderSelect(manualValue || "", manualOnChange || (() => {}));
};
