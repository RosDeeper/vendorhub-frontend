import { Stack } from "@mui/material";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { 
  commonMotionProps,
  containerVariants, 
  formVariants, 
  heroVariants 
} from "@/components/common/animation";
import { IMAGES } from "@/components/images";
import EmailForm from "../SignUp/components/EmailForm";
import OTPForm from "../SignUp/components/OTPForm";
import PasswordForm from "../SignUp/components/PasswordForm";
import { initialValues, SignUpFormValues } from "../SignUp/helpers";
import { OTP_STEP } from "@/src/constants/path";

const ForgetPassword = () => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<SignUpFormValues>(initialValues);
  
  const currentStep = 
    searchParams.get("step") as (typeof OTP_STEP)[keyof typeof OTP_STEP] ?? OTP_STEP.EMAIL;

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
            src={IMAGES.VendorBlackLogo}
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
                <EmailForm isForgotPassword onNext={handleNext} />
              )}
              {currentStep === OTP_STEP.OTP && (
                <OTPForm data={formData} isForgotPassword />
              )}
              {currentStep === OTP_STEP.CREATE_PASSWORD && (
                <PasswordForm isForgotPassword />
              )}
            </motion.div>
          </AnimatePresence>
        </Stack>
      </motion.div>
    </div>
  );
};

export default ForgetPassword;
