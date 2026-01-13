import { Stack, Typography, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import Image from "next/image";

import { Form } from "@/components/ui";
import { Button, FormInput, NavigationMenu } from "@/components/common";
import { SYSTEM_PATHS } from "@/src/constants/path";
import { Toastify, mockLogin, protocol, rootDomain } from "@/lib";
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
      <div 
        className='h-full'
        style={{ padding: '40px 120px 20px' }}
      >
        <Stack flexDirection='row' justifyContent='space-between'>
          <NavigationMenu
            items={leftNavItems}
          />
          <NavigationMenu
            items={rightNavItems} 
          />
        </Stack>

        <Stack flexDirection='row' justifyContent='flex-end' mt={8}>
          <Stack flexDirection='column' alignItems='center'>
            <Image 
              src='/assets/vendor-hub-black.png' 
              alt='vendorHub-logo-black' 
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
                <Form {...form}>
                  <form onSubmit={handleSubmit(handleValidSubmit)}>
                    <Grid container gap={3}>
                      <Grid size={12}>
                        <FormInput 
                          name={CrudKeys._EMAIL}
                          placeholder="Enter Email"
                        />
                      </Grid>
                      <Grid size={12}>
                        <FormInput 
                          name={CrudKeys._PASSWORD}
                          type='password'
                          placeholder="Enter Password"
                        />
                      </Grid>
                    </Grid>

                    <Stack mt={4} justifyContent='center' direction='row'>
                      <Button
                        type="submit"
                        variant='secondary'
                        label="Sign In"
                        style={{ width: '100%', backgroundColor: '#D7CECE' }}
                        disabled={isLoading}
                        isLoading={isLoading}
                      />
                    </Stack>
                  </form>
                </Form>
              </Stack>
            </Stack>
          </Stack>

        </Stack>
      </div>
    </div>
  );
};

export default LoginPage;
