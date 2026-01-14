import { Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { FaStarOfLife } from "react-icons/fa";
import { motion } from "motion/react";
import Image from "next/image";

import { PeopleGroupEmoji } from "@/components/common/Emoji";
import { Form } from "@/components/ui";
import { TEXT_SIZE, FONT_WEIGHT } from "@/src/constants/text";
import { SYSTEM_PATHS } from "@/src/constants/path";
import { FormInput, FormCheckbox, Button } from "@/components/common";
import { 
  CrudKeys, 
  formSchema, 
  initialValues, 
  SignUpFormValues,
  formVariants,
  heroVariants
} from "./helpers";
import { useDialog } from "@/components/hooks";
import { Toastify } from "@/lib/toast";

import { useRegister } from "@/src/queries";
import { RegisterPayload } from "@/app/services";

const SignUpPage = () => {
  const router = useRouter();
  const { openDialog, closeDialog } = useDialog();
  const [checked, setChecked] = useState<boolean>(false);

  const { register, isLoading } = useRegister({
    onSuccess() {
      handleOnSuccess();
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
    const payload: RegisterPayload = {
      email: formValues.email,
      password: formValues.password,
    };

    register(payload);
  };

  const handleOnSuccess = () => {
    openDialog({
      type: 'alert',
      size: 'sm',
      content: (
        <Stack px={3} py={1} gap={2}>
          <Stack direction='column' alignItems='center' gap={1} mb={2}>
            <Typography
              sx={{
                fontSize: TEXT_SIZE.HXL,
                fontWeight: FONT_WEIGHT.BOLD,
                color: '#584700',
              }}
            >
              Sign-up successfully
            </Typography>
            <Typography 
              textAlign='center'
              sx={{
                fontSize: TEXT_SIZE.BASE,
                fontWeight: FONT_WEIGHT.MEDIUM,
                marginBottom: '20px',
              }}
            >
              Log back in with your new sign-in inforamtion to get started with {" "}
              <span style={{ color: '#BC9900BF' }}>vendorHub</span>!
            </Typography>
            <PeopleGroupEmoji />
          </Stack>

          <Button
            label="Login"
            onClick={() => {
              router.push(`${SYSTEM_PATHS.auth}?type=login`);
              closeDialog();
            }}
          />
        </Stack>
      ),
    });
  };

  return (
    <div style={{
      padding: "40px 0px",
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      overflowX: 'hidden'
    }}>
      <motion.p
        variants={heroVariants}
        style={{
          fontSize: '28px',
          color: '#fff',
          fontWeight: 600,
          width: '50%',
          marginTop: 'auto',
          paddingLeft: '40px',
        }}
      >
        Easily access your personal hub to stay clear, focused, and productive
      </motion.p>
      
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit='exit'
        style={{
          width: '50%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Stack width='460px'>
          <Image 
            src='/assets/vendor-black.png' 
            alt='vendorHub-logo-black' 
            width={160}
            height={16}
            style={{
              objectFit: 'contain',
              marginLeft: 'auto',
              marginBottom: '20px'
            }}
          />

          <Stack mb='40px'>
            <FaStarOfLife size={28} color="#453838" />
            <Typography className="create-title">
              Create an account
            </Typography>
            <Typography color="#453838" textAlign='center'>
              Access your tasks, notes, and project anytime,<br />
              anywhere - and keep everything flowflowing in one place.
            </Typography>
          </Stack>

          <Form {...form}>
            <form onSubmit={handleSubmit(handleValidSubmit)}>
              <Grid container gap={3}>
                <Grid size={12}>
                  <FormInput 
                    name={CrudKeys._EMAIL}
                    label="Your Email"
                    placeholder="example@gmail.com"
                    required
                    variant='light'
                  />
                </Grid>
                <Grid size={12}>
                  <FormInput 
                    name={CrudKeys._PASSWORD}
                    label="Password"
                    type='password'
                    placeholder="*******"
                    required
                    variant='light'
                  />
                </Grid>
                <Grid size={12}>
                  <FormInput 
                    name={CrudKeys._CONFIRM_PASSWORD}
                    label="Confirm Password"
                    type='password'
                    placeholder="*******"
                    required
                    variant='light'
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
                  variant='secondary'
                  style={{ width: '100%', backgroundColor: '#E6E6E6', color: '#000' }}
                  disabled={isLoading}
                  isLoading={isLoading}
                />
              </Stack>
            </form>
          </Form>
          
          <Stack flexDirection='column' alignItems='center' gap={2} mt={4}>
            <Typography>
              or sign in with
            </Typography>
            <Button
              type="submit"
              variant='secondary'
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
        </Stack>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
