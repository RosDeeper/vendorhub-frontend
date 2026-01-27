import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import { FaStarOfLife } from "react-icons/fa";
import { LuArrowRightFromLine } from "react-icons/lu";
import { useTimer } from "react-timer-hook";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import duration from "dayjs/plugin/duration";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import dayjs from "dayjs";
import Cookies from "universal-cookie";

import { Button, FormOTPInput } from "@/components/common";
import { IMAGES } from "@/components/images";
import { SYSTEM_PATHS } from "@/src/constants/path";
import { formVariants } from "@/components/common/animation";
import { Toastify } from "@/lib";
import { SignUpFormValues } from "../helpers";

import { useVerifyOTP, useSendOTP } from "@/src/queries";

type Props = {
  data: SignUpFormValues,
};

dayjs.extend(duration);

const OTPForm = ({ data }: Props) => {
  const router = useRouter();
  const [otp, setOtp] = useState<string>('');
  const cookies = new Cookies();

  const { sendOTP, isLoading: isSendingOTP } = useSendOTP({
    onSuccess() {
      restart(getExpiryTime(300));
    },
    onError() {
      Toastify.error("Send OTP Failed! Please try again.");
    },
  });

  const { verifyOTP, isLoading } = useVerifyOTP({
    onSuccess(data) {
      handleSetToken(data?.accessToken); 
    },
    onError() {
      Toastify.error("Verify OTP Failed! Please try again.");
    },
  });

  const getExpiryTime = (seconds: number) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + seconds);

    return time;
  };

  const {
    minutes,
    seconds,
    restart,
    isRunning
  } = useTimer({ 
    expiryTimestamp: getExpiryTime(300),
    autoStart: true, 
  });

  const totalSeconds = minutes * 60 + seconds;
  const timeDuration = dayjs.duration({ minutes, seconds });

  const handleResendOTP = () => {
    sendOTP(data);
  };

  const handleVerifyOTP = () => {
    verifyOTP({ email: data.email, otp });
  };

  const handleSetToken = (token: string) => {
    if (token) {
      cookies.set('accessToken', token, {
        maxAge: 60 * 15,
        path: '/',
        sameSite: 'lax',
      });

      router.push(`${SYSTEM_PATHS.auth}?type=signup&step=password`);
    } else {
      Toastify.error("Can not get OTP Verification. Please try again.");
    }
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
          OTP Verification
        </Typography>
        <Image
          src={IMAGES.OTPImage}
          alt='otp-image'
          width={140}
          height={140}
          style={{
            margin: '0 auto'
          }}
        />
        <Typography color="#8695A6" textAlign='center' mt={4}>
          The One-Time Password (OTP) has been sent to email <br />
          {data?.email}
        </Typography>
      </Stack>

      <FormOTPInput value={otp} onChange={setOtp} />

      {isRunning ? (
        <Typography color="#8695A6" textAlign='center' mt={4}>
          OTP will be expired in{' '}
          <span style={{ color: '#3A86FF' }}>{timeDuration.format("mm:ss")}</span>
        </Typography>
      ) : (
        <Typography 
          mt={4} 
          color="#8695A6"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          OTP has been expired.{" "}
          {isSendingOTP ? (
            <LoaderCircle className="animate-spin" width={16} height={16} color="#3A86FF" />
          ) : (
            <span
              className="underline cursor-pointer"
              style={{ color: '#3A86FF' }}
              onClick={handleResendOTP}
            >
              Resend
            </span>
          )}
        </Typography>
      )}

      <Stack mt={4} gap={2}>
        <Button
          type="submit"
          label="Continue"
          variant='primary'
          endIcon={<LuArrowRightFromLine size={20} />}
          style={{ width: '100%' }}
          onClick={handleVerifyOTP}
          isLoading={isLoading}
          disabled={otp?.length !== 6 || totalSeconds <= 0 || isLoading}
        />
        <Button
          type="submit"
          label="Back"
          variant='secondary'
          style={{ width: '100%' }}
          disabled={isLoading}
          onClick={() => router.back()}
        />
      </Stack>
    </motion.div>
  );
};

export default OTPForm;
