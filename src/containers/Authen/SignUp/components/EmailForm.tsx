import { Grid, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { FaGoogle, FaStarOfLife } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { Button, FormCheckbox, FormInput } from "@/components/common";
import { SYS_PATHS, OTP_STEP, SYS_TYPE } from "@/src/constants/path";
import { CrudKeys, formSchema, initialValues, SignUpFormValues } from "../helpers";
import { Toastify } from "@/lib";
import { TEXT_SIZE } from "@/src/constants/text";

import { useSendOTP, useSendForgotOTP } from "@/src/queries";

type Props = {
  onNext?: (payload: SignUpFormValues) => void;
  isForgotPassword?: boolean;
};

const EmailForm = ({ onNext, isForgotPassword }: Props) => {
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(false);

  const { mutate: sendOTP, isLoading } = useSendOTP({
    onSuccess() {
      router.push(
        `${SYS_PATHS.auth}?type=${SYS_TYPE.SIGN_UP}&step=${OTP_STEP.OTP}`
      );
    },
    onError() {
      Toastify.error('Sign-up Failed! Please try again');
    },
  });

  const { 
    mutate: sendForgotOTP, 
    isLoading: isSendForgotLoading 
  } = useSendForgotOTP({
    onSuccess() {
      router.push(
        `${SYS_PATHS.auth}?type=${SYS_TYPE.FORGET_PASSWORD}&step=${OTP_STEP.OTP}`
      );
    },
    onError() {
      Toastify.error('Send OTP Failed! Please try again');
    },
  });
  
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema(isForgotPassword)) as any,
    defaultValues: initialValues,
  });

  const { handleSubmit } = form;

  const handleValidSubmit = (formValues: SignUpFormValues) => {
    onNext?.(formValues);
    
    if (isForgotPassword) {
      sendForgotOTP(formValues);
    } else {
      sendOTP(formValues);
    }
  };

  return (
    <>
      <Stack mb='40px'>
        <FaStarOfLife size={28} />
        <Typography className="create-title">
          {isForgotPassword ? 'Forgot password' : 'Create your account'}
        </Typography>
        <Typography textAlign='center'>
          {isForgotPassword ? (
            'Enter your email to receive a recovery code.'
          ) : (
            <>
              Access your tasks, notes, and project anytime,
              <br />
              anywhere - and keep everything flowing in one place.
            </>
          )}
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

            {!isForgotPassword && (
              <>
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
              </>
            )}

          </Grid>

          <Button
            type="submit"
            label={isForgotPassword ? 'Send OTP' : 'Get Started'}
            variant='primary'
            style={{ width: '100%', marginTop: '32px', borderRadius: '99px' }}
            disabled={(isLoading || !checked) && (!isForgotPassword || isSendForgotLoading)}
            isLoading={isLoading || isSendForgotLoading}
          />
        </form>
      </FormProvider>
      
      <Stack flexDirection='column' alignItems='center' gap={2} mt={4}>
        {!isForgotPassword && (
          <>
            <Typography>
              or sign in with
            </Typography>
            <Button
              type="submit"
              variant='primary'
              size='icon'
              startIcon={<FaGoogle size={18} />}
            />
          </>
        )}
        <Typography>
          Already have an account?{' '}
          <Link href={`${SYS_PATHS.auth}?type=${SYS_TYPE.LOGIN}`}>
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
