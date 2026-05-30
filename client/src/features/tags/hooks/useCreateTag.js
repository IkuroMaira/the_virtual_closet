import { useQueryClient, useMutation } from '@tanstack/react-query';
import { addNewTag } from '../../../shared/services/tags_api';


export const useCreateTag = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: addNewTag,
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
};
