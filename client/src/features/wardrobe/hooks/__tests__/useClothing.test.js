import { describe, test, expect } from "vitest";
import { useClothing } from "../useClothing";

describe("useClothing", () => {
    test('should return garment details'), () => {
        expect(useClothing());
    }

    test('should return an error message when there is error', () => {
        expect(useClothing());
    })

    test("'should return an error message when it's not fount'", () => {
        expect(useClothing());
    })
})
