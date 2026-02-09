'use client';

import { useFormContext, useWatch } from "react-hook-form";
import { Stack, Grid } from "@mui/material";

import { FormSwitch, FormTimePicker } from "@/components/common";
import { WEEKDAY_OPTIONS } from "@/lib";

type ScheduleItemProps = {
  dayLabel: string;
  dayValue: string;
  name: string;
};

const ScheduleItem = ({ dayLabel, name, dayValue }: ScheduleItemProps) => {
  const { control, getValues, setValue } = useFormContext();

  const schedules = useWatch({ control, name }) || [];
  const currentIndex = schedules.findIndex((item: any) => item?.day === dayValue);
  const isEnabled = currentIndex !== -1;

  const handleToggle = (checked: boolean) => {
    const currentValues = getValues(name) || [];

    if (checked) {
      const newItem = { 
        day: dayValue, 
        startTime: getValues(`${name}.${currentIndex}.startTime`), 
        endTime: getValues(`${name}.${currentIndex}.endTime`),
      };

      setValue(name, [...currentValues, newItem]);
    } else {
      const filtered = currentValues.filter((item: any) => item.day !== dayValue);
      
      setValue(name, filtered);
    }
  };

  return (
    <Stack gap={1}>
      <FormSwitch 
        name=''
        label={dayLabel}
        checked={isEnabled}
        onCheckedChange={handleToggle}
      />
      {isEnabled && (
        <Grid container spacing={2} alignItems='center'>
          <Grid size={5.5}>
            <FormTimePicker name={`${name}.${currentIndex}.startTime`} />

          </Grid>
          <Grid size={1}>

          <span>-</span>
          </Grid>
          <Grid size={5.5}>
          <FormTimePicker name={`${name}.${currentIndex}.endTime`} />

          </Grid>
        </Grid>
      )}
    </Stack>
  );
};

const ScheduleField = ({ name }: { name: string }) => {
  return (
    <Grid container spacing={2}>
      {WEEKDAY_OPTIONS.map((day, index) => (
        <Grid key={index} size={6}>
          <ScheduleItem 
            name={name}
            dayValue={day.value}
            dayLabel={day.label}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ScheduleField;
