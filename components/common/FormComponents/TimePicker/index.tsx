'use client';

import { FieldValues, Path, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { FormField, FormControl, FormItem } from "@/components/ui";
import { HOURS_OPTIONS, MINUTES_OPTIONS } from "@/lib";
import { FormSelect } from "../Select";

dayjs.extend(utc);

type FormTimePickerProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
}

export const FormTimePicker = <T extends FieldValues>({ 
  name, 
  label 
}: FormTimePickerProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <FormField 
      control={control}
      name={name}
      render={({ field }) => {
        const hasValue = !!field.value;
        const currentTime = hasValue ? dayjs(field.value) : null;

        const hour = (hasValue && currentTime?.isValid()) ? currentTime.format("HH") : '';
        const minute = (hasValue && currentTime?.isValid()) ? currentTime.format("mm") : '';

        const handleTimeChange = (type: "h" | "m", val: string) => {
          const newTime = (hasValue && currentTime?.isValid()) 
            ? currentTime 
            : dayjs().set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0);
            
          const updated = type === "h" 
            ? newTime.set("hour", parseInt(val)) 
            : newTime.set("minute", parseInt(val));
          
          field.onChange(updated.second(0).millisecond(0).utc().toISOString());
        };

        return (
          <FormItem className="flex flex-col gap-2">
            {label && (
              <span className="font-bold text-[#2C3E50]">{label}</span>
            )}

            <FormControl>
              <div className="flex items-center justify-between bg-white rounded-full">
                <div className="flex-1">
                  <FormSelect
                    name={'' as any} 
                    options={HOURS_OPTIONS}
                    value={hour}
                    onChange={(val) => handleTimeChange("h", val)}
                    placeholder='00'
                    isTimePicker
                  />
                </div>
                <div className="flex-1">
                  <FormSelect
                    name={'' as any} 
                    options={MINUTES_OPTIONS}
                    value={minute}
                    onChange={(val) => handleTimeChange("m", val)}
                    placeholder='00'
                    isTimePicker
                  />
                </div>
              </div>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};
