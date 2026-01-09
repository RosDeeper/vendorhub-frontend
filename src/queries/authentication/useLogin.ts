'use client';

import { useMutation } from "@tanstack/react-query";

import { login } from "@/app/services";

type Props = {
  onSuccess?: (data?: any) => void;
  onError?: (error?: Error) => void;
};

export const useLogin = (options: Props) => {
  const mutation = useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },

    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
