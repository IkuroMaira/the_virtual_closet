import { getItem } from "@/shared/services/clothes_api";
import { useQuery } from "@tanstack/react-query";

export const useClothing = (id) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["clothing", id],
    queryFn: () => getItem(id),
  });

  return {
    isPending,
    isError,
    data,
    error,
  };
};
