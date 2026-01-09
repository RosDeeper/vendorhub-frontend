'use client';

import { useMutation } from "@tanstack/react-query";

import { register } from "@/app/services";

type Props = {
  onSuccess?: (data?: any) => void;
  onError?: (error?: Error) => void;
};

export const useRegister = (options: Props) => {
  const mutation = useMutation({
    mutationFn: register,

    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },

    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });

  return {
    register: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
