import { describe, test, expect, vi } from "vitest";
import { useClothing } from "../useClothing";
import { renderHook, waitFor} from "@testing-library/react";

const queryClient = new QueryClient();
const wrapper = ({ children }) => {
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

const { result } = renderHook(() => useCustomHook(), { wrapper })

await waitFor(() => expect(result.current.isSuccess).toBe(true))

expect(result.current.data).toEqual('Hello')

describe("useClothing", () => {
    test('should return garment details', () => {
        const getClothingDetails = vi.fn()

        getClothingDetails.mockReturnValue(result)

        expect(useClothing());
    })

    test('should return an error message when there is error', () => {
        expect(useClothing());
    })

    test("'should return an error message when it's not fount'", () => {
        expect(useClothing());
    })
})
