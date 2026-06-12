import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateTag } from '../../../shared/services/tags_api';


export const useUpdateTag = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: ({ tagId, tagData }) => updateTag(tagId, tagData),
        onSuccess: () => queryClient.invalidateQueries(
            {
                queryKey: ['tags']
            }
        )   
    })  

    return {
        mutate,
        isPending,
        isError,
        error
    }
}