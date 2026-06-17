import { getAllClothes } from "@/shared/services/clothes_api.jsx"
import { useQuery } from "@tanstack/react-query"

export const useClothes = () => {
    const { isPending, isError, data, error } = useQuery({
      queryKey: ["clothes"],
      queryFn: () => getAllClothes()
        // queryFn: () => new Promise(r => setTimeout(r, 2000)).then(() => getAllClothes()) // Pour tester en local l'animation de loading
    })

    return {
        isPending,
        isError,
        data,
        error,
    }
}
