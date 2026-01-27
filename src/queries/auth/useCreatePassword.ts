import { useMutation } from "@tanstack/react-query";

import { createPassword } from "@/app/services/auth.service";

type Props = {
  onSuccess?: (data?: any) => void;
  onError?: (error?: Error) => void;
};

export const useCreatePassword = (options: Props) => {
  const mutation = useMutation({
    mutationFn: createPassword,

    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },

    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });

  return {
    createPassword: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
