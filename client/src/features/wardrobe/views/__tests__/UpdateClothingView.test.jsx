import { describe, test, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UpdateClothingView from "../UpdateClothingView";
import { updateClothing, getItem, getAllEnums } from "@/shared/services/clothes_api";

const mockNavigate = vi.fn();

vi.mock("@/shared/services/clothes_api", () => ({
    getAllEnums: vi.fn(),
    getItem: vi.fn(),
    updateClothing: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: '1' }),
}));

vi.mock("sonner", () => ({
    toast: { success: vi.fn(), error: vi.fn() },
}));

const fakeClothing = {
    id: 1,
    name: "Robe bleue d'été",
    category: "Robes",
    color: "Bleu",
};

function createWrapper() {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    });
    return ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}

describe("UpdateClothingView — intégration", () => {
    test("affiche le formulaire pré-rempli avec les données du vêtement", async () => {
        getAllEnums.mockResolvedValue({});
        getItem.mockResolvedValue(fakeClothing);

        render(<UpdateClothingView />, { wrapper: createWrapper() });

        await waitFor(() => {
            expect(screen.getByPlaceholderText("Quel petit nom ?")).toHaveValue("Robe bleue d'été");
        });
    });

    test("appelle updateClothing avec les bonnes données à la soumission", async () => {
        getAllEnums.mockResolvedValue({ CategoryEnum: ["Robes"], ColorEnum: ["Bleu"] });
        getItem.mockResolvedValue(fakeClothing);
        updateClothing.mockResolvedValue(fakeClothing);

        const user = userEvent.setup();
        render(<UpdateClothingView />, { wrapper: createWrapper() });

        await waitFor(() => {
            expect(screen.getByPlaceholderText("Quel petit nom ?")).toHaveValue("Robe bleue d'été");
        });

        await user.click(screen.getByText("Enregistrer"));

        await waitFor(() => {
            expect(updateClothing).toHaveBeenCalledWith(
                expect.objectContaining({ id: '1', name: "Robe bleue d'été", category: "Robes", color: "Bleu" }),
                expect.anything()
            );
        });
    });

    test("navigue vers la page détail après une modification réussie", async () => {
        getAllEnums.mockResolvedValue({ CategoryEnum: ["Robes"], ColorEnum: ["Bleu"] });
        getItem.mockResolvedValue(fakeClothing);
        updateClothing.mockResolvedValue(fakeClothing);

        const user = userEvent.setup();
        render(<UpdateClothingView />, { wrapper: createWrapper() });

        await waitFor(() => {
            expect(screen.getByPlaceholderText("Quel petit nom ?")).toHaveValue("Robe bleue d'été");
        });

        await user.click(screen.getByText("Enregistrer"));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith({ to: '/clothes/1' });
        });
    });

    test("affiche une erreur de validation si le nom est trop court", async () => {
        getAllEnums.mockResolvedValue({});
        getItem.mockResolvedValue(fakeClothing);

        const user = userEvent.setup();
        render(<UpdateClothingView />, { wrapper: createWrapper() });

        await waitFor(() => {
            expect(screen.getByPlaceholderText("Quel petit nom ?")).toHaveValue("Robe bleue d'été");
        });

        await user.clear(screen.getByPlaceholderText("Quel petit nom ?"));
        await user.type(screen.getByPlaceholderText("Quel petit nom ?"), "R");
        await user.click(screen.getByText("Enregistrer"));

        await waitFor(() => {
            expect(screen.getByText("Le nom doit contenir au moins 2 caractères.")).toBeInTheDocument();
        });
    });
});
