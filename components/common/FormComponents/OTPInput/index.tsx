"use client";

import { Dispatch, SetStateAction } from "react";

import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "./lib-ui";

type OTPInputProps = {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
};

export const FormOTPInput = ({ value, onChange }: OTPInputProps) => {
  return (
    <InputOTP 
      maxLength={6}
      value={value}
      onChange={onChange}
      inputMode='numeric'
      pattern="\d*"
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
};
