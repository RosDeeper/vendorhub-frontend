import { 
  login,
  sendOTP,
  sendForgotOTP,
  verifyOTP,
  verifyForgotOTP,
  createPassword,
  createForgotPassword,
} from "@/src/services/auth.service";
import { useAppMutation } from "../useAppMutation";

type Props = {
  onSuccess?: (data?: any) => void;
  onError?: (error?: Error) => void;
};

export const useLogin = (options?: Props) => useAppMutation(login, options);

export const useSendOTP = (options?: Props) => useAppMutation(sendOTP, options);

export const useVerifyOTP = (options?: Props) => useAppMutation(verifyOTP, options);

export const useCreatePassword = (options?: Props) => useAppMutation(createPassword, options);

export const useSendForgotOTP = (options?: Props) => useAppMutation(sendForgotOTP, options);

export const useVerifyForgotOTP = (options?: Props) => useAppMutation(verifyForgotOTP, options);

export const useCreateForgotPassword = (options?: Props) => useAppMutation(createForgotPassword, options);
