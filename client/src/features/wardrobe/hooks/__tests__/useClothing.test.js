import { describe, test, expect, vi } from "vitest";
import { useClothing } from "../useClothing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";

vi.mock('@/shared/services/clothes_api.jsx', () => ({
    getItem: vi.fn()
}));

import { getItem } from "@/shared/services/clothes_api.jsx";

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

describe("useClothing", () => {
    test('should return garment details', async () => {
        const fakeGarment = {
            id: 1,
            created_at: "2025-09-05",
            updated_at: "2025-11-02",
            category: "shirt",
            size: "L",
            status: "clean",
            style: "business",
            brand_id: 2,
            user_is: 1,
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

    test('should return an error message when there is error', () => {
        expect(useClothing());
    });

    test("'should return an error message when it's not fount'", () => {
        expect(useClothing());
    });
})
