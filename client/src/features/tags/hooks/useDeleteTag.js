import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteTag } from '../../../shared/services/tags_api';


export const useDeleteTag = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: deleteTag,
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
