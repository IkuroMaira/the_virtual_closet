import { getAllClothes } from "@/shared/services/clothes_api.jsx"
import { useQuery } from "@tanstack/react-query"

export const useClothes = () => {
    const  { isPending, isError, data, error } = useQuery({
        queryKey: ["clothes"],
        queryFn: () => getAllClothes()
    })

    return {
        isPending,
        isError,
        data,
        error,
    }
}
