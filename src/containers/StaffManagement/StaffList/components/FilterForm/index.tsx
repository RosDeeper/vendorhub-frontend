'use client';

import { Grid, Stack, Typography } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { BiFilterAlt } from "react-icons/bi";
import { LiaTimesSolid } from "react-icons/lia";

import {  FormSelect, Button, FormTimePicker } from "@/components/common";
import { WEEKDAY_OPTIONS } from "@/lib";
import { 
  FilterKeys,
  ProductFilterParams, 
  ProductFilterParamsValues 
} from "../helpers";

const FilterForm = () => {
  const form = useForm<ProductFilterParams>({
    defaultValues: ProductFilterParamsValues,
  });

  const { handleSubmit } = form;

  const handleValidSubmit = (formValues: ProductFilterParams) => {
    console.log(formValues);
  };

  return (
    <Stack>
      <Stack direction='row' gap={2} alignItems='center'>
        <BiFilterAlt size={22} />
        <Typography style={{
          fontSize: '18px',
          fontWeight: 700
        }}>
          Filter Data
        </Typography>
      </Stack>

      <Typography mt={1} mb={1}>
        Narrow down the results quickly and find what you need.
      </Typography>
      
      <Stack mt={1}>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(handleValidSubmit)} id="filter-form">
            <Grid container spacing={3}>
              <Grid size={4}>
                <FormSelect 
                  name={FilterKeys._WEEK_DAY}
                  label="Week Day"
                  options={WEEKDAY_OPTIONS}
                  placeholder="Select"
                />
              </Grid>
              <Grid size={4}>
                <FormSelect 
                  name={FilterKeys._STATUS}
                  label="Status"
                  options={[
                    { label: 'Active', value: 'active' },
                    { label: 'Inactive', value: 'inactive' },
                  ]}
                  placeholder="Select"
                />
              </Grid>
              <Grid size={4}>
                <FormSelect 
                  name={FilterKeys._SERVICES}
                  label="Services"
                  options={[]}
                  placeholder="Select"
                />
              </Grid>
              <Grid size={2}>
                <FormTimePicker 
                  name={FilterKeys._START_TIME}
                  label="Start Time"
                />
              </Grid>
              <Grid size={2}>
                <FormTimePicker 
                  name={FilterKeys._END_TIME}
                  label="End Time"
                />
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </Stack>

      <Stack 
        justifyContent='flex-end'
        direction='row'
        gap={2}
        style={{ marginTop: '12px' }}
      >
        <Button
          variant='outline'
          label="Reset"
          style={{ width: '140px', borderRadius: '12px' }}
          startIcon={<LiaTimesSolid style={{ width: '20px', height: '20px' }} />}
        />
        <Button
          type="submit"
          variant='primary'
          form="filter-form"
          label="Apply"
          style={{ width: '140px', borderRadius: '12px' }}
          startIcon={<BiFilterAlt style={{ width: '20px', height: '20px' }} />}
        />
      </Stack>
    </Stack>
  );
};

export default FilterForm;
