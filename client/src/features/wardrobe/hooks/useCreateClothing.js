import { useMutation } from "@tanstack/react-query"
import { createClothing } from "../../../shared/services/clothes_api";

export const useCreateClothing = ({ onSuccess, onError } = {}) => {
  const { isPending, isError, mutate, error } = useMutation({
    mutationFn: createClothing,
    onSuccess,
    onError,
  });

  return {
    mutate,
    isPending,
    isError,
    error
  }
};