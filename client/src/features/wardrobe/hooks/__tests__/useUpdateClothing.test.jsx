import { describe, test, expect, vi } from "vitest";
import { useUpdateClothing } from "../useUpdateClothing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { updateClothing } from "@/shared/services/clothes_api";

vi.mock('@/shared/services/clothes_api', () => ({
    updateClothing: vi.fn()
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

describe('useUpdateClothing', () => {
    test('should call updateClothing with the payload', async () => {
        const fakeClothing = {
            id: 1,
            name: "Robe bleue modifiée",
            category: "Robes",
            color: "Bleu",
        };

        updateClothing.mockResolvedValue(fakeClothing);

        const onSuccess = vi.fn();
        const { result } = renderHook(() => useUpdateClothing(), {
            wrapper: createWrapper()
        });

        result.current.mutate(fakeClothing, { onSuccess });

        await waitFor(() => {
            expect(updateClothing.mock.calls[0][0]).toEqual(fakeClothing);
            expect(onSuccess).toHaveBeenCalled();
        });
    });

    test('should set isError to true when updateClothing fails', async () => {
        updateClothing.mockRejectedValue(new Error('Erreur serveur'));

        const onError = vi.fn();
        const { result } = renderHook(() => useUpdateClothing(), {
            wrapper: createWrapper()
        });

        result.current.mutate({ id: 1, name: "Robe", category: "Robes", color: "Bleu" }, { onError });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
            expect(onError).toHaveBeenCalled();
        });
    });

    test('should set isPending to true while updating', async () => {
        updateClothing.mockImplementation(() => new Promise(() => {}));

        const { result } = renderHook(() => useUpdateClothing(), {
            wrapper: createWrapper()
        });

        result.current.mutate({ id: 1, name: "Robe", category: "Robes", color: "Bleu" });

        await waitFor(() => {
            expect(result.current.isPending).toBe(true);
        });
    });
});
