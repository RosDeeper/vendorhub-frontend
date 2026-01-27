import { Grid, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { FaGoogle, FaStarOfLife } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";

import { Button, FormCheckbox, FormInput } from "@/components/common";
import { SYSTEM_PATHS } from "@/src/constants/path";
import { CrudKeys, formSchema, initialValues, SignUpFormValues } from "../helpers";
import { Toastify } from "@/lib";
import { TEXT_SIZE } from "@/src/constants/text";

import { useSendOTP } from "@/src/queries";

type Props = {
  onNext: (payload: SignUpFormValues) => void;
};

const EmailForm = ({ onNext }: Props) => {
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(false);

  const { sendOTP, isLoading } = useSendOTP({
    onSuccess() {
      router.push(`${SYSTEM_PATHS.auth}?type=signup&step=otp`);
    },
    onError() {
      Toastify.error("Sign-up Failed! Please try again.");
    },
  });
  
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const {
    handleSubmit,
  } = form;

  const handleValidSubmit = (formValues: SignUpFormValues) => {
    sendOTP(formValues);
    onNext(formValues);
  };

  // const handleOnSuccess = () => {
  //   openDialog({
  //     type: 'alert',
  //     size: 'sm',
  //     content: (
  //       <Stack px={3} py={1} gap={2}>
  //         <Stack direction='column' alignItems='center' gap={1} mb={2}>
  //           <Typography
  //             sx={{
  //               fontSize: TEXT_SIZE.HXL,
  //               fontWeight: FONT_WEIGHT.BOLD,
  //               color: '#584700',
  //             }}
  //           >
  //             Sign-up successfully
  //           </Typography>
  //           <Typography 
  //             textAlign='center'
  //             sx={{
  //               fontSize: TEXT_SIZE.BASE,
  //               fontWeight: FONT_WEIGHT.MEDIUM,
  //               marginBottom: '20px',
  //             }}
  //           >
  //             Log back in with your new sign-in inforamtion to get started with {" "}
  //             <span style={{ color: '#BC9900BF' }}>vendorHub</span>!
  //           </Typography>
  //           <PeopleGroupEmoji />
  //         </Stack>

  //         <Button
  //           label="Login"
  //           onClick={() => {
  //             router.push(`${SYSTEM_PATHS.auth}?type=login`);
  //             closeDialog();
  //           }}
  //         />
  //       </Stack>
  //     ),
  //   });
  // };

  return (
    <>
      <Stack mb='40px'>
        <FaStarOfLife size={28} />
        <Typography className="create-title">
          Create an account
        </Typography>
        <Typography color="#453838" textAlign='center'>
          Access your tasks, notes, and project anytime,<br />
          anywhere - and keep everything flowflowing in one place.
        </Typography>
      </Stack>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(handleValidSubmit)}>
          <Grid container gap={3}>
            <Grid size={12}>
              <FormInput 
                name={CrudKeys._EMAIL}
                label="Email"
                placeholder="Enter email"
                required
                variant='light'
                autoComplete='off'
              />
            </Grid>

            <Grid size={12}>
              <FormInput 
                name={CrudKeys._PHONE_NUMBER}
                label="Phone Number"
                placeholder="Enter phone number"
                required
                variant='light'
                autoComplete='off'
              />
            </Grid>

            <Grid size={12}>
              <FormCheckbox 
                name=""
                variant='light'
                checked={checked}
                onClick={() => setChecked(!checked)}
                label={
                  <Stack direction='row' alignItems='center' gap={1}>
                    <Typography sx={{ fontSize: TEXT_SIZE.SM }}>
                      By creating an account, you agree to the{" "}
                      <span className="underline">Terms</span>{" "}
                      and{" "}
                      <span className="underline">Privacy Policy</span>
                    </Typography>
                  </Stack>
                }
              />
            </Grid>
          </Grid>

          <Stack mt={4} justifyContent='center' direction='row'>
            <Button
              type="submit"
              label="Get Started"
              variant='primary'
              style={{ width: '100%' }}
              disabled={isLoading || !checked}
              isLoading={isLoading}
            />
          </Stack>
        </form>
      </FormProvider>
      
      <Stack flexDirection='column' alignItems='center' gap={2} mt={4}>
        <Typography>
          or sign in with
        </Typography>
        <Button
          type="submit"
          variant='primary'
          size='icon'
          startIcon={<FaGoogle size={18} />}
        />
        <Typography>
          Already have an account?{' '}
          <Link href={`${SYSTEM_PATHS.auth}?type=login`}>
            <span style={{
              fontWeight: 600,
              color: '#8394FF'
            }}>Sign in</span>
          </Link>
        </Typography>
      </Stack>
    </>
  );
};

export default EmailForm;
