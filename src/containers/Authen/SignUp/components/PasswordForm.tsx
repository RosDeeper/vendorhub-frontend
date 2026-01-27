/* eslint-disable react-hooks/incompatible-library */
import { Grid, Stack, Typography } from "@mui/material";
import { FaStarOfLife } from "react-icons/fa";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdLockOutline } from "react-icons/md";
import { motion } from "motion/react";
import { LuArrowRightFromLine } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { IMAGES } from "@/components/images";
import { Button, FormInput, PasswordStrength } from "@/components/common";
import { 
  CreatePasswordFormValues, 
  CrudKeys, 
  initialPasswordValues, 
  passwordSchema 
} from "../helpers";
import { formVariants } from "@/components/common/animation";
import { SYSTEM_PATHS } from "@/src/constants/path";
import { Toastify } from "@/lib";
import { useDialog } from "@/components/hooks";
import { TEXT_SIZE } from "@/src/constants/text";

import { useCreatePassword } from "@/src/queries";

const PasswordForm = () => {
  const { openDialog, closeDialog } = useDialog();

  const { createPassword, isLoading } = useCreatePassword({
    onSuccess() {
      handleOnSuccess();
    },
    onError() {
      Toastify.error("Create Password Failed! Please try again.");
    },
  });

  const form = useForm<CreatePasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: initialPasswordValues,
  });
  
  const { handleSubmit, watch } = form;
  
  const password = watch(CrudKeys._PASSWORD);

  const handleValidSubmit = (formValues: CreatePasswordFormValues) => {
    createPassword({ password: formValues.password });    
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
                color: '#253857',
                fontWeight: 700,
              }}
            >
              Sign-up successfully
            </Typography>
            <Typography 
              textAlign='center'
              sx={{ marginBottom: '20px' }}
            >
              Log back in with your new sign-in inforamtion to get started with {" "}
              <span style={{ 
                color: '#253857',
                fontWeight: 700
              }}
              >vendorHub</span>!
            </Typography>
            <Image 
              src={IMAGES.Congratulation}
              alt="congratulation"
              width={160}
              height={160}
            />
          </Stack>
          
          <Link href={`${SYSTEM_PATHS.auth}?type=login`}>
            <Button
              label="Sign-in"
              endIcon={<LuArrowRightFromLine size={20} />}
              onClick={() => closeDialog()}
            />
          </Link>
        </Stack>
      ),
    });
  };

  return (
    <motion.div 
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <Stack mb='40px'>
        <FaStarOfLife size={28} />
        <Typography className="create-title">
          Create a password
        </Typography>
        <Image
          src={IMAGES.CreatePassword}
          alt='create-password-image'
          width={140}
          height={140}
          style={{
            margin: '0 auto'
          }}
        />
        <Typography color="#8695A6" textAlign='center' mt={4}>
          Passwords must be eight or more characters long. <br />
          Strong passwords contain one symbol, one uppercase letter, and one lowercase letter.
        </Typography>
      </Stack>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(handleValidSubmit)}>
          <Grid container gap={3}>
            <Grid size={12}>
              <FormInput 
                name={CrudKeys._PASSWORD}
                type='password'
                label="Password"
                placeholder="Enter password"
                required
                variant='light'
                startIcon={<MdLockOutline size={20} />}
              />
              <PasswordStrength password={password} />
            </Grid>
            <Grid size={12}>
              <FormInput 
                name={CrudKeys._CONFIRM_PASSWORD}
                type='password'
                label="Confirm Password"
                placeholder="Enter confirm password"
                required
                variant='light'
                startIcon={<MdLockOutline size={20} />}
              />
            </Grid>
          </Grid>

          <Stack mt={4} justifyContent='center' direction='row'>
            <Button
              type="submit"
              label="Continue"
              variant='primary'
              endIcon={<LuArrowRightFromLine size={20} />}
              style={{ width: '100%' }}
              isLoading={isLoading}
              disabled={isLoading}
            />
          </Stack>
        </form>
      </FormProvider>
    </motion.div>
  );
};

export default PasswordForm;
