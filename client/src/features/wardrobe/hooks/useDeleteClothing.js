import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteClothing } from "../../../shared/services/clothes_api";

export const useDeleteClothing = () => {
  const queryClient = useQueryClient();

  const { isPending, isError, mutate, error } = useMutation({
    mutationFn: deleteClothing,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["clothing", data.id] });
      queryClient.invalidateQueries({ queryKey: ["clothes"] });
    },
  });

  return {
    isPending,
    isError,
    mutate,
    error,
  };
};
