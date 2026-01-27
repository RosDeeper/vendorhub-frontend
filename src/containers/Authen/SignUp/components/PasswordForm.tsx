/* eslint-disable react-hooks/incompatible-library */
import { Grid, Stack, Typography } from "@mui/material";
import { FaStarOfLife } from "react-icons/fa";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdLockOutline } from "react-icons/md";
import { motion } from "motion/react";
import { LuArrowRightFromLine } from "react-icons/lu";
import { useRouter } from "next/navigation";

import { IMAGES } from "@/components/images";
import { Button, FormInput, PasswordStrength } from "@/components/common";
import { 
  CreatePasswordFormValues, 
  CrudKeys, 
  initialPasswordValues, 
  passwordSchema 
} from "../helpers";
import { formVariants } from "@/components/common/animation";

import { useCreatePassword } from "@/src/queries";
import { SYSTEM_PATHS } from "@/src/constants/path";
import { Toastify } from "@/lib";

const PasswordForm = () => {
  const router = useRouter();

  const { createPassword, isLoading } = useCreatePassword({
    onSuccess() {
      router.push(`${SYSTEM_PATHS.auth}?type=login`);
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
