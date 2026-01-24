"use client";

import { Dispatch, SetStateAction } from "react";

import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
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
      </InputOTPGroup>
      <InputOTPGroup>
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <InputOTPGroup>
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPGroup>
        <InputOTPSlot index={3} />
      </InputOTPGroup>
      <InputOTPGroup>
        <InputOTPSlot index={4} />
      </InputOTPGroup>
      <InputOTPGroup>
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
};
