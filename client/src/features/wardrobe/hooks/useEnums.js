import { getAllEnums } from "../../../shared/services/clothes_api";
import { useQuery } from "@tanstack/react-query"

export const useEnums = () => {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ["enums"],
        queryFn: () => getAllEnums()
    })

    return {
        isPending,
        isError,
        data,
        error,
    }
}