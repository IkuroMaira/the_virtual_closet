import { getAllClothes } from "@/shared/services/clothes_api.jsx"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

export const useClothes = (page = 1) => {
    const { isPending, isError, data, error } = useQuery({
      queryKey: ["clothes", page],
      queryFn: () => getAllClothes(page),
      placeholderData: keepPreviousData,
        // queryFn: () => new Promise(r => setTimeout(r, 2000)).then(() => getAllClothes(page)) // Pour tester en local l'animation de loading
    })

    return {
        isPending,
        isError,
        data: data?.items,
        total: data?.total ?? 0,
        page: data?.page ?? page,
        pageSize: data?.page_size ?? 20,
        totalPages: data?.total_pages ?? 0,
        error,
    }
}
