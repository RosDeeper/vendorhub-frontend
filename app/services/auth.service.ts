'use server';

import { apiAuthClient } from "@/src/queries";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  phone: string;
};

export type VerifyOTPPayload = {
  email: string;
  name?: string;
  otp: string;
};

export const login = async (payload: LoginPayload): Promise<any> => (
  apiAuthClient<any, LoginPayload>({
    endpoint: "/auth/login",
    payload,
  })
);

export const sendOTP = async (payload: RegisterPayload): Promise<any> => (
  apiAuthClient<any, RegisterPayload>({
    endpoint: "/auth/registeration/sendOTP",
    payload,
  })
);

export const verifyOTP = async (payload: VerifyOTPPayload): Promise<any> => (
  apiAuthClient<any, VerifyOTPPayload>({
    endpoint: '/auth/registeration/verifyOTP',
    payload,
  })
);

export const createPassword = async (payload: { password: string }): Promise<any> => (
  apiAuthClient<any, { password: string }>({
    endpoint: '/auth/registeration/createPassword',
    payload,
  })
);
