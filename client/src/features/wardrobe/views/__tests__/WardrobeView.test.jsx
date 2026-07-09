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

function fakePage(items, overrides = {}) {
    return {
        items,
        total: items.length,
        page: 1,
        page_size: 20,
        total_pages: 1,
        ...overrides,
    };
}

describe("WardrobeView", () => {
    test("affiche les vêtements retournés par l'API", async () => {
        getAllClothes.mockResolvedValue(fakePage([
            { id: 1, name: "T-shirt", category: "Tops", color: "Bleu", status: "Actif", size: "M", style: null, season: null, note: null, picture: null },
            { id: 2, name: "Jean", category: "Pantalons", color: "Noir", status: "Actif", size: "L", style: null, season: null, note: null, picture: null },
        ]));

        render(<WardrobeView />, { wrapper: createWrapper() });

        await waitFor(() => {
            expect(screen.getByText("T-shirt")).toBeInTheDocument();
            expect(screen.getByText("Jean")).toBeInTheDocument();
        });
    });

    test("affiche un message quand la garde-robe est vide", async () => {
        getAllClothes.mockResolvedValue(fakePage([], { total: 0, total_pages: 0 }));

        render(<WardrobeView />, { wrapper: createWrapper() });

        await waitFor(() => {
            expect(screen.getByText("Aucun vêtement dans votre garde-robe pour le moment.")).toBeInTheDocument();
        });
    });

    test("affiche les contrôles de pagination et change de page au clic", async () => {
        getAllClothes.mockImplementation((page = 1) => Promise.resolve(
            fakePage(
                [{ id: page, name: `Item page ${page}`, category: "Tops", color: "Bleu", status: "Actif", size: "M", style: null, season: null, note: null, picture: null }],
                { page, total: 40, total_pages: 2 }
            )
        ));

        render(<WardrobeView />, { wrapper: createWrapper() });

        await waitFor(() => {
            expect(screen.getByText("Item page 1")).toBeInTheDocument();
        });
        expect(screen.getByText("Page 1 sur 2")).toBeInTheDocument();

        screen.getByLabelText("Page suivante").click();

        await waitFor(() => {
            expect(screen.getByText("Item page 2")).toBeInTheDocument();
        });
        expect(screen.getByText("Page 2 sur 2")).toBeInTheDocument();
    });

    test("affiche le message de chargement", () => {
        getAllClothes.mockImplementation(() => new Promise(() => {}));

        render(<WardrobeView />, { wrapper: createWrapper() });

        expect(screen.getByText("Chargement de votre garde-robe...")).toBeInTheDocument();
    });

    test("affiche un message d'erreur si l'API échoue", async () => {
        getAllClothes.mockRejectedValue(new Error("Erreur serveur"));

        render(<WardrobeView />, { wrapper: createWrapper() });

        await waitFor(() => {
            expect(screen.getByText("Error: Erreur serveur")).toBeInTheDocument();
        });
    });
});
