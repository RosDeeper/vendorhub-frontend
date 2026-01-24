import { Stack } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import EmailForm from "./components/EmailForm";
import OTPForm from "./components/OTPForm";
import PasswordForm from "./components/PasswordForm";
import { IMAGES } from "@/components/images";
import { 
  containerVariants, 
  formVariants, 
  heroVariants 
} from "@/components/common/animation";

type SignUpStep = 'email' | 'otp' | 'password';

const SignUpPage = () => {
  const searchParams = useSearchParams();
  const [emailData, setEmailData] = useState<string>('');

  const currentStep = searchParams.get('step') as SignUpStep || 'email';

  const handleNext = (email: string) => {
    setEmailData(email);
  };

  return (
    <div className="signup-wrapper">
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
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {currentStep === 'email' && (
                <EmailForm onNext={handleNext} />
              )}
              {currentStep === 'otp' && (
                <OTPForm email={emailData} />
              )}
              {currentStep === 'password' && (
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
