import { 
  login,
  refreshToken,
  logout,
  sendOTP,
  sendForgotOTP,
  verifyOTP,
  verifyForgotOTP,
  createPassword,
  createForgotPassword,
} from "@/src/services/auth.service";
import { useAuthMutation } from "./useAuthMutation";

type Props = {
  onSuccess?: (data?: any) => void;
  onError?: (error?: Error) => void;
};

export const useLogin = (options?: Props) => useAuthMutation(login, options);

export const useRefreshToken = (options?: Props) => useAuthMutation(refreshToken, options);

export const useLogout = (options?: Props) => useAuthMutation(logout, options);

export const useSendOTP = (options?: Props) => useAuthMutation(sendOTP, options);

export const useVerifyOTP = (options?: Props) => useAuthMutation(verifyOTP, options);

export const useCreatePassword = (options?: Props) => useAuthMutation(createPassword, options);

export const useSendForgotOTP = (options?: Props) => useAuthMutation(sendForgotOTP, options);

export const useVerifyForgotOTP = (options?: Props) => useAuthMutation(verifyForgotOTP, options);

export const useCreateForgotPassword = (options?: Props) => useAuthMutation(createForgotPassword, options);
