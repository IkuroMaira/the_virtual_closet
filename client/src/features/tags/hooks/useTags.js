// Hooks customisé pour la logique
// Ici toute la logique de gestion des tags

import { getAllTags } from '../../../shared/services/tags_api';
import { useQuery } from "@tanstack/react-query"

export const useTags = () => {

    const { isPending, isError, data, error } = useQuery({
        queryKey: ["tags"],
        queryFn: () => getAllTags()
    })

    return {
        isPending,
        isError,
        data,
        error,
    }
};