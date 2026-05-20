import { describe, test, expect, vi } from "vitest";
import { useClothing } from "../useClothing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { getItem } from "@/shared/services/clothes_api.jsx";

vi.mock('@/shared/services/clothes_api.jsx', () => ({
    getItem: vi.fn()
}));

function createWrapper() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            }
        }
    })

    return ({ children }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

describe('useClothing', () => {
    test('should return garment details', async () => {
        const fakeGarment = {
            category: "shirt",
            size: "L",
            status: "clean",
            style: "business",
            brand_id: 2,
            season: "spring",
            note: 8,
            material: "linen",
            comment: "Idéal pour les réunions en extérieur.",
            color: "white",
            picture: "shirt_white.jpg",
            name: "Chemise lin blanche"
        }

        getItem.mockResolvedValue(fakeGarment)

        const { result } = renderHook(() => useClothing(1), { wrapper: createWrapper() });

        await waitFor(() => {
            expect(result.current.data).toEqual(fakeGarment);
        });
    });

    test('should return an error message when service fails', async () => {
        getItem.mockRejectedValue(new Error('Erreur serveur'))

        const { result } = renderHook(() => useClothing(1), { wrapper: createWrapper() });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });
        expect(result.current.error.message).toBe('Erreur serveur');
    });

    test('should handle not found', async () => {
        getItem.mockRejectedValue(new Error('Not found'));

        const { result } = renderHook(() => useClothing(1), { wrapper: createWrapper() });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });
        expect(result.current.error.message).toBe('Not found');
    });
})
