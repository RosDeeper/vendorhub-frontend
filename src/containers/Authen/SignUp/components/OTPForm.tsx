import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import { FaStarOfLife } from "react-icons/fa";
import { LuArrowRightFromLine } from "react-icons/lu";
import { useTimer } from "react-timer-hook";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useRouter } from "next/navigation";

import { Button, FormOTPInput } from "@/components/common";
import { IMAGES } from "@/components/images";
import { SYSTEM_PATHS } from "@/src/constants/path";
import { motion } from "motion/react";
import { formVariants } from "@/components/common/animation";

type Props = {
  email: string,
};

dayjs.extend(duration);

const OTPForm = ({ email }: Props) => {
  const router = useRouter();
  const [otp, setOtp] = useState<string>('');
  const [serverOtp, setServerOtp] = useState("")

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const getExpiryTime = (seconds = 60) => {
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
    const newOtp = generateOtp();

    setServerOtp(newOtp);
    setOtp('');
    restart(getExpiryTime(300));
  };

  const onSuccess = () => {
    console.log({
      email,
      otp,
    })
    router.push(`${SYSTEM_PATHS.auth}?type=signup&step=password`);
  };
  
  useEffect(() => {
    const newOtp = generateOtp();

    setServerOtp(newOtp);
  }, []);

  console.log("Generated OTP:", serverOtp);

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
          {email}
        </Typography>
      </Stack>

      <FormOTPInput value={otp} onChange={setOtp} />

      {isRunning ? (
        <Typography color="#8695A6" textAlign='center' mt={4}>
          OTP will be expired in{' '}
          <span style={{ color: '#3A86FF' }}>{timeDuration.format("mm:ss")}</span>
        </Typography>
      ) : (
        <Typography textAlign='center' mt={4} color="#8695A6">
          OTP has been expired.{" "}
          <span
            className="underline cursor-pointer"
            style={{ color: '#3A86FF' }}
            onClick={handleResendOTP}
          >
            Resend
          </span>
        </Typography>
      )}

      <Stack mt={4} gap={2}>
        <Button
          type="submit"
          label="Continue"
          variant='primary'
          endIcon={<LuArrowRightFromLine size={20} />}
          style={{ width: '100%' }}
          onClick={onSuccess}
          disabled={(otp !== serverOtp) || (!isRunning || totalSeconds <= 0)}
        />
        <Button
          type="submit"
          label="Back"
          variant='secondary'
          style={{ width: '100%' }}
        />
      </Stack>
    </motion.div>
  );
};

export default OTPForm;
