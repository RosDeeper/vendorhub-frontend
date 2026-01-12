'use client';

import { Stack, Typography, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { CiMail } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import { LuArrowRightFromLine } from "react-icons/lu";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";

import { Form } from "@/components/ui";
import { GoogleLogo } from "@/components/common/Logo";
import { COLOR_CODES } from "@/src/constants/color";
import { Button, Divider, FormInput } from "@/components/common";
import { SYSTEM_PATHS } from "@/src/constants/path";
import { Toastify, mockLogin, protocol, rootDomain } from "@/lib";
import { CrudKeys, formSchema, initialValues, LoginFormValues } from "./helpers";

import { useLogin } from "@/src/queries";

const LoginPage = () => {
  const router = useRouter();
  const cookies = new Cookies();

  const { login, isLoading } = useLogin({
    onSuccess(data) {
      Toastify.success("Login Successfully!");
      cookies.set('accessToken', data.accessToken, { 
        path: '/' ,
        sameSite: 'strict',
        maxAge: 15 * 60,
      });
      router.push(SYSTEM_PATHS.dashboard);
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
    // login(formValues);
    const { email, password } = formValues;
    const result = mockLogin(email, password);

    if (!result) {
      return;
    }

    localStorage.setItem('accessToken', result.accessToken)
    localStorage.setItem('user', JSON.stringify(result.user))

    redirect(`${protocol}://${result.user.tenant.slug}.${rootDomain}/dashboard`);
  };

  return (
    <div className="background-image">
      <div className='h-full'>
        <Stack>
          {/* <Button 
            variant='primary'
            label="CONTINUE WITH GOOGLE"
            startIcon={<GoogleLogo />}
            style={{
              backgroundColor: COLOR_CODES.SECONDARY_BG,
              marginTop: '20px',
              marginBottom: '28px'
            }}
            onClick={handleLoginWithGoogle}
          /> */}

          {/* <Form {...form}>
            <form onSubmit={handleSubmit(handleValidSubmit)}>
              <Grid container gap={3}>
                <Grid size={12}>
                  <FormInput 
                    name={CrudKeys._EMAIL}
                    label="Email"
                    placeholder="seller@gmail.com"
                    startIcon={<CiMail style={{ width: '24px', height: '24px' }} />}
                    required
                  />
                </Grid>
                <Grid size={12}>
                  <FormInput 
                    name={CrudKeys._PASSWORD}
                    label="Password"
                    type='password'
                    placeholder="*******"
                    startIcon={<IoKeyOutline style={{ width: '24px', height: '24px' }} />}
                    handleForgetPassword={() => router.push(SYSTEM_PATHS.forgetPassword)}
                    required
                    includeForgetPass
                  />
                </Grid>
              </Grid>

              <Stack mt={4} justifyContent='center' direction='row'>
                <Button
                  type="submit"
                  label="LET'S GO!"
                  endIcon={<LuArrowRightFromLine style={{ width: '20px', height: '20px' }} />}
                  style={{
                    minWidth: '300px',
                  }}
                  disabled={isLoading}
                  isLoading={isLoading}
                />
              </Stack>
            </form>
          </Form> */}
        </Stack>
      </div>
    </div>
  );
};

export default LoginPage;
