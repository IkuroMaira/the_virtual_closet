import { describe, test, expect, vi } from "vitest";
import { useCreateClothing } from "../useCreateClothing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { createClothing } from "@/shared/services/clothes_api";

vi.mock('@/shared/services/clothes_api', () => ({
    createClothing: vi.fn()
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

describe('useCreateClothing', () => {
    test('should call createClothing with the payload', async () => {
        const fakeClothing = {
            id: 1,
            name: "t-shirt de mon père",
            category: "Tops",
            color: "Bleu",
        };

        createClothing.mockResolvedValue(fakeClothing);

        const onSuccess = vi.fn();
        const { result } = renderHook(() => useCreateClothing({ onSuccess }), {
            wrapper: createWrapper()
        });

        result.current.mutate(fakeClothing);

        await waitFor(() => {
            expect(onSuccess).toHaveBeenCalled();
            expect(onSuccess.mock.calls[0][0]).toEqual(fakeClothing);
        });
    });

    test('should call onError when createClothing fails', async () => {
        createClothing.mockRejectedValue(new Error('Erreur serveur'));

        const onError = vi.fn();
        const { result } = renderHook(() => useCreateClothing({ onError }), {
            wrapper: createWrapper()
        });

        result.current.mutate({ name: "t-shirt", category: "Tops", color: "Bleu" });

        await waitFor(() => {
            expect(onError).toHaveBeenCalled();
        });

        expect(result.current.isError).toBe(true);
    });

    test('should set isPending to true while creating', async () => {
        createClothing.mockImplementation(() => new Promise(() => {}));

        const { result } = renderHook(() => useCreateClothing(), {
            wrapper: createWrapper()
        });

        result.current.mutate({ name: "t-shirt", category: "Tops", color: "Bleu" });

        await waitFor(() => {
            expect(result.current.isPending).toBe(true);
        });
    });
});
