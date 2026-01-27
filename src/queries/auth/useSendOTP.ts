import { useMutation } from "@tanstack/react-query";

import { sendOTP } from "@/app/services/auth.service";

type Props = {
  onSuccess?: (data?: any) => void;
  onError?: (error?: Error) => void;
};

export const useSendOTP = (options: Props) => {
  const mutation = useMutation({
    mutationFn: sendOTP,

    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },

    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });

  return {
    sendOTP: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
