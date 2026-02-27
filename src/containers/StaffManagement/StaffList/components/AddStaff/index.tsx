import { FormProvider, useForm } from "react-hook-form";
import { Grid, Stack, Typography } from "@mui/material";

import { 
  Button, 
  Accordion,
  FormInput, 
  FormMultiSelect,
  FormSwitch,
} from "@/components/common";
import { useDialog } from "@/components/hooks";
import ScheduleField from "../ScheduleField";
import { 
  FormKeys, 
  AddStaffFormValues, 
  initialFormValues 
} from "./helpers";

const AddStaff = () => {
  const { closeDialog } = useDialog();

  const form = useForm<AddStaffFormValues>({
    defaultValues: initialFormValues,
  });

  const { handleSubmit } = form;

  const handleValidSubmit = (payload: any) => {
    console.log(payload)
  };

  return (
    <Stack>
      <div className="custom-scrollbar" 
        style={{ 
          maxHeight: '560px',
          overflowY: 'auto',
          paddingRight: '4px'
        }}
      >
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(handleValidSubmit)} id='add-form'>
            <Grid container spacing={2}>
              <Grid size={12}>
                <FormInput 
                  name={FormKeys._AVATAR_URL}
                  label="Avatar"
                  required
                  variant='light'
                  placeholder="Enter fullname"
                />
              </Grid>
              <Grid size={4.5}>
                <FormInput 
                  name={FormKeys._FULL_NAME}
                  label="Fullname"
                  required
                  variant='light'
                  placeholder="Enter fullname"
                />
              </Grid>
              <Grid size={6}>
                <FormMultiSelect 
                  name={FormKeys._SERVICES}
                  label="Services"
                  options={[
                    {label: 'Nails', value: 'abcd'},
                    {label: 'Salon', value: 'xyz'},
                    {label: 'Hair', value: 'mno'},
                  ]}
                  required
                />
              </Grid>
              <Grid size={1.5}>
                <FormSwitch 
                  name={FormKeys._STATUS}
                  label="Active"
                />
              </Grid>
              <Grid size={12}>
                <Typography color="#2c3e50" fontWeight={700} letterSpacing={1} mb={1}>
                  Working Hour
                  <span style={{ color: 'red', marginLeft: '4px' }}>*</span>
                </Typography>

                <ScheduleField name={FormKeys._WORKING_HOUR} />
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </div>

      <Stack direction='row' justifyContent='flex-end' gap={2} mt={2}>
        <Button
          label="Cancel"
          variant='outline'
          onClick={() => closeDialog()}
          style={{ width: '80px' }}
        />
        <Button
          label="Add"
          type='submit'
          form="add-form"
          style={{ width: '80px' }}
        />
      </Stack>
    </Stack>
  );
};

export default AddStaff;
