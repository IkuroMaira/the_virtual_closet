import { useMutation, useQueryClient } from "@tanstack/react-query";
  import { updateClothing } from "../../../shared/services/clothes_api";

  export const useUpdateClothing = () => {
    const queryClient = useQueryClient();

    const { isPending, isError, mutate, error } = useMutation({
      mutationFn: updateClothing,
      onSuccess: (data, updatedClothing) => {
        queryClient.invalidateQueries({ queryKey: ["clothing", updatedClothing.id] });
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