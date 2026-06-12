import { describe, test, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WardrobeView from "../WardrobeView";
import { getAllClothes } from "@/shared/services/clothes_api";

vi.mock("@/shared/services/clothes_api", () => ({
    getAllClothes: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
    Link: ({ children }) => <a>{children}</a>,
}));

function createWrapper() {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}

describe("WardrobeView", () => {
    test("affiche les vêtements retournés par l'API", async () => {
        getAllClothes.mockResolvedValue([
            { id: 1, name: "T-shirt", category: "Tops", color: "Bleu", status: "Actif", size: "M", style: null, season: null, note: null, picture: null },
            { id: 2, name: "Jean", category: "Pantalons", color: "Noir", status: "Actif", size: "L", style: null, season: null, note: null, picture: null },
        ]);

        render(<WardrobeView />, { wrapper: createWrapper() });

        await waitFor(() => {
            expect(screen.getByText("T-shirt")).toBeInTheDocument();
            expect(screen.getByText("Jean")).toBeInTheDocument();
        });
    });

    test("affiche un message quand la garde-robe est vide", async () => {
        getAllClothes.mockResolvedValue([]);

        render(<WardrobeView />, { wrapper: createWrapper() });

        await waitFor(() => {
            expect(screen.getByText("Aucun vêtement dans votre garde-robe pour le moment.")).toBeInTheDocument();
        });
    });

    test("affiche le message de chargement", () => {
        getAllClothes.mockImplementation(() => new Promise(() => {}));

        render(<WardrobeView />, { wrapper: createWrapper() });

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    test("affiche un message d'erreur si l'API échoue", async () => {
        getAllClothes.mockRejectedValue(new Error("Erreur serveur"));

        render(<WardrobeView />, { wrapper: createWrapper() });

        await waitFor(() => {
            expect(screen.getByText("Error: Erreur serveur")).toBeInTheDocument();
        });
    });
});
