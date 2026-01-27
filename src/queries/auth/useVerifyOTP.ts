import { useMutation } from "@tanstack/react-query";

import { verifyOTP } from "@/app/services/auth.service";

type Props = {
  onSuccess?: (data?: any) => void;
  onError?: (error?: Error) => void;
};

export const useVerifyOTP = (options: Props) => {
  const mutation = useMutation({
    mutationFn: verifyOTP,

    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },

    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });

  return {
    verifyOTP: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
