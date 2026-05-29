import { useMutation } from "@tanstack/react-query"
import { createClothing } from "../../../shared/services/clothes_api";

export const useCreateClothing = () => {
  const { isPending, isError, mutate, error } = useMutation({
    mutationFn: createClothing,
    onSuccess: () => { },
    onError: (error) => {}
  });

  return {
    mutate,
    isPending,
    isError,
    error
  }
};