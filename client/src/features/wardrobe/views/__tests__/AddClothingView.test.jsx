import { describe, test, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddClothingView from "../AddClothingView";
import { createClothing, getAllEnums } from "@/shared/services/clothes_api";

const mockNavigate = vi.fn();

vi.mock("@/shared/services/clothes_api", () => ({
    getAllEnums: vi.fn(),
    createClothing: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
    useNavigate: () => mockNavigate,
}));

vi.mock("sonner", () => ({
    toast: { success: vi.fn(), error: vi.fn() },
}));

function createWrapper() {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
    return ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}

describe("AddClothingView — intégration", () => {
    test("affiche le formulaire de création", () => {
        getAllEnums.mockResolvedValue({});
        render(<AddClothingView />, { wrapper: createWrapper() });

        expect(screen.getByPlaceholderText("Quel petit nom ?")).toBeInTheDocument();
    });

    test("affiche une erreur de validation si le nom est vide", async () => {
        getAllEnums.mockResolvedValue({});
        const user = userEvent.setup();
        render(<AddClothingView />, { wrapper: createWrapper() });

        await user.click(screen.getByText("Enregistrer"));

        await waitFor(() => {
            expect(screen.getByText("Le nom doit contenir au moins 2 caractères.")).toBeInTheDocument();
        });
    });

    test("affiche les erreurs de validation pour category et color quand le nom est valide", async () => {
        getAllEnums.mockResolvedValue({});
        const user = userEvent.setup();
        render(<AddClothingView />, { wrapper: createWrapper() });

        await user.type(screen.getByPlaceholderText("Quel petit nom ?"), "Mon t-shirt");
        await user.click(screen.getByText("Enregistrer"));

        await waitFor(() => {
            expect(screen.getByText("La catégorie est obligatoire.")).toBeInTheDocument();
            expect(screen.getByText("La couleur est obligatoire.")).toBeInTheDocument();
        });
    });

    test("appelle createClothing avec les bonnes données à la soumission", async () => {
        getAllEnums.mockResolvedValue({});
        createClothing.mockResolvedValue({ id: 1, name: "Mon t-shirt", category: "Tops", color: "Bleu" });
        const user = userEvent.setup();
        render(<AddClothingView />, { wrapper: createWrapper() });

        await user.type(screen.getByPlaceholderText("Quel petit nom ?"), "Mon t-shirt");
        await user.click(screen.getByText("Enregistrer"));

        await waitFor(() => {
            expect(screen.getByText("La catégorie est obligatoire.")).toBeInTheDocument();
        });
    });

    test("appelle onError si createClothing échoue", async () => {
        getAllEnums.mockResolvedValue({});
        createClothing.mockRejectedValue(new Error("Erreur serveur"));
        const user = userEvent.setup();
        render(<AddClothingView />, { wrapper: createWrapper() });

        await user.type(screen.getByPlaceholderText("Quel petit nom ?"), "Mon t-shirt");
        await user.click(screen.getByText("Enregistrer"));

        await waitFor(() => {
            expect(screen.getByText("La catégorie est obligatoire.")).toBeInTheDocument();
        });
    });
});
