import { describe, test, expect, vi } from "vitest";
import { useDeleteClothing } from "../useDeleteClothing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { deleteClothing } from "@/shared/services/clothes_api";

vi.mock('@/shared/services/clothes_api', () => ({
    deleteClothing: vi.fn()
}));

function createWrapper() {
    const queryClient = new QueryClient({
        defaultOptions: {
            mutations: {
                retry: false,
            }
        }
    });

    return ({ children }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

describe('useDeleteClothing', () => {
    test('should call deleteClothing with the item id', async () => {
        const fakeClothing = { id: 1, name: "Chemise lin blanche" };

        deleteClothing.mockResolvedValue(fakeClothing);

        const onSuccess = vi.fn();
        const { result } = renderHook(() => useDeleteClothing(), {
            wrapper: createWrapper()
        });

        result.current.mutate(1, { onSuccess });

        await waitFor(() => {
            expect(deleteClothing.mock.calls[0][0]).toEqual(1);
            expect(onSuccess).toHaveBeenCalled();
        });
    });

    test('should set isError to true when deleteClothing fails', async () => {
        deleteClothing.mockRejectedValue(new Error('Erreur serveur'));

        const onError = vi.fn();
        const { result } = renderHook(() => useDeleteClothing(), {
            wrapper: createWrapper()
        });

        result.current.mutate(1, { onError });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
            expect(onError).toHaveBeenCalled();
        });
    });

    test('should set isPending to true while deleting', async () => {
        deleteClothing.mockImplementation(() => new Promise(() => {}));

        const { result } = renderHook(() => useDeleteClothing(), {
            wrapper: createWrapper()
        });

        result.current.mutate(1);

        await waitFor(() => {
            expect(result.current.isPending).toBe(true);
        });
    });
});
