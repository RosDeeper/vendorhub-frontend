import { Stack, Typography, Grid } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { motion } from "motion/react";
import Link from "next/link";

import { Button, FormCheckbox, FormInput, NavigationMenu } from "@/components/common";
import { SYS_IMAGES } from "@/components/images";
import { 
  commonMotionProps, 
  formVariants, 
  navVariants 
} from "@/components/common/animation";
import { SYS_PATHS, SYS_TYPE } from "@/src/constants/path";
import { Toastify, protocol, rootDomain } from "@/lib";
import { 
  CrudKeys, 
  formSchema, 
  initialValues, 
  leftNavItems, 
  LoginFormValues, 
  rightNavItems
} from "./helpers";

import { useLogin } from "@/src/queries";

const LoginPage = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const targetUrl = `${protocol}://test.${rootDomain}/dashboard`;

  const { mutate: login, isLoading } = useLogin({
    onSuccess() {
      Toastify.success("Login Successfully!");
      window.location.href = targetUrl;
    },
    onError() {
      Toastify.error("Login Failed! Please try again.");
    },
  });

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const {
    handleSubmit,
  } = form;

  const handleValidSubmit = (formValues: LoginFormValues) => {
    login(formValues);
  };

  return (
    <div 
      style={{
        minHeight: "100vh",
        padding: "40px 120px 40px",
        overflowX: 'hidden'
      }}
    >
      <motion.nav
        variants={navVariants}
        {...commonMotionProps}
      >
        <Stack flexDirection='row' justifyContent='space-between'>
          <NavigationMenu items={leftNavItems} />
          <NavigationMenu items={rightNavItems} />
        </Stack>
      </motion.nav>

      <motion.div
        variants={formVariants}
        {...commonMotionProps}
      >
        <Stack flexDirection='row' justifyContent='center' mt={8}>
          <Stack flexDirection='column' alignItems='center'>
            <Image 
              src={SYS_IMAGES.VendorWhiteLogo}
              alt='vendorHub-logo-white' 
              width={340}
              height={28}
              objectFit='contain'
            />

            <Stack className="login-container">
              <Typography className="welcome-text">
                Hello !
              </Typography>
              <Typography className="welcome-text">
                Welcome Back
              </Typography>

              <Stack mt='60px' width='400px'>
                <FormProvider {...form}>
                  <form onSubmit={handleSubmit(handleValidSubmit)}>
                    <Grid container gap={3}>
                      <Grid size={12}>
                        <FormInput 
                          name={CrudKeys._EMAIL}
                          placeholder="Enter Email"
                          autoComplete='off'
                        />
                      </Grid>
                      <Grid size={12}>
                        <FormInput 
                          name={CrudKeys._PASSWORD}
                          type='password'
                          placeholder="Enter Password"
                          autoComplete='off'
                        />
                      </Grid>
                      <Grid size={12}>
                        <Stack flexDirection='row' justifyContent='space-between'>
                          <FormCheckbox 
                            name=""
                            checked={checked}
                            onClick={() => setChecked(!checked)}
                            label={
                              <span style={{
                                fontWeight: 400,
                                color: '#fff',
                                letterSpacing: 1
                              }}>
                                Remember me
                              </span>
                            }
                          />

                          <Link href={`${SYS_PATHS.auth}?type=${SYS_TYPE.FORGET_PASSWORD}`}>
                            <Typography 
                              className="span-white"
                              style={{ cursor: 'pointer' }}
                            >
                              Forgot password ?
                            </Typography>
                          </Link>
                        </Stack>
                      </Grid>
                    </Grid>

                    <Stack mt={4} justifyContent='center' direction='row'>
                      <Button
                        type="submit"
                        variant='secondary'
                        label="Sign In"
                        style={{ width: '100%' }}
                        disabled={isLoading}
                        isLoading={isLoading}
                      />
                    </Stack>
                  </form>
                </FormProvider>

                <Stack flexDirection='column' alignItems='center' gap={2} mt={4}>
                  <Typography className="span-white">
                    or sign in with
                  </Typography>
                  <Button
                    type="submit"
                    variant='secondary'
                    size='icon'
                    startIcon={<FaGoogle size={18} />}
                  />
                  <Typography className="span-white">
                    Don&apos;t have an account?{' '}
                    <Link href={`${SYS_PATHS.auth}?type=${SYS_TYPE.SIGN_UP}`}>
                      <span style={{
                        fontWeight: 600,
                        color: '#8394FF'
                      }}>Sign up</span>
                    </Link>
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>

        </Stack>
      </motion.div>
    </div>
  );
};

export default LoginPage;
