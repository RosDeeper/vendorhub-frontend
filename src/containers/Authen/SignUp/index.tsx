import { Stack } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import EmailForm from "./components/EmailForm";
import OTPForm from "./components/OTPForm";
import PasswordForm from "./components/PasswordForm";
import { SYS_IMAGES } from "@/components/images";
import { 
  commonMotionProps,
  containerVariants, 
  formVariants, 
  heroVariants 
} from "@/components/common/animation";
import { initialValues, SignUpFormValues } from "./helpers";
import { OTP_STEP } from "@/src/constants/path";

const SignUpPage = () => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<SignUpFormValues>(initialValues);

  const currentStep = 
    searchParams.get('step') as (typeof OTP_STEP)[keyof typeof OTP_STEP] ?? OTP_STEP.EMAIL;

  const handleNext = (payload: SignUpFormValues) => {
    setFormData(payload);
  };

  return (
    <div className="signup-wrapper">
      <motion.p
        variants={heroVariants}
        className="slogan-text"
      >
        Easily access your personal hub to stay clear, focused, and productive
      </motion.p>
      
      <motion.div
        variants={formVariants}
        style={{
          width: '50%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Stack width='460px'>
          <Image 
            src={SYS_IMAGES.VendorBlackLogo}
            alt='vendorHub-logo-black' 
            width={160}
            height={16}
            style={{
              objectFit: 'contain',
              marginLeft: 'auto',
              marginBottom: '20px'
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={containerVariants}
              {...commonMotionProps}
            >
              {currentStep === OTP_STEP.EMAIL && (
                <EmailForm onNext={handleNext} />
              )}
              {currentStep === OTP_STEP.OTP && (
                <OTPForm data={formData} />
              )}
              {currentStep === OTP_STEP.CREATE_PASSWORD && (
                <PasswordForm />
              )}
            </motion.div>
          </AnimatePresence>
        </Stack>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
