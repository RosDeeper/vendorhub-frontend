import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useAuthMutation = <TData, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, Error, TVariables>
) => {
  const mutation = useMutation<TData, Error, TVariables>({
    mutationFn,
    ...options,
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
