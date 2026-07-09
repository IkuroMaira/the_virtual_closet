import { useState } from "react";
import { useClothes } from "../hooks/useClothes.js";
import ClothingCard from "../components/ClothingCard.jsx"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { IconShirt } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router";

export default function WardrobeView() {
    const [page, setPage] = useState(1);
    const { isPending, isError, data, totalPages, error } = useClothes(page);

    const renderContent = () => {
        if (isPending) return (
            <div className="col-span-full flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
                <IconShirt className="w-12 h-12 animate-bounce" />
                <p className="text-sm">Chargement de votre garde-robe...</p>
            </div>
        )
        if (isError) return <span>Error: {error.message}</span>
        if (data.length === 0) return <p>Aucun vêtement dans votre garde-robe pour le moment.</p>
        return data.map(item => <ClothingCard key={item.id} clothing={item} />)
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderContent()}
            </div>

            {!isPending && !isError && totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                    <Button
                        variant="outline"
                        size="icon-sm"
                        disabled={page <= 1}
                        onClick={() => setPage(p => p - 1)}
                        aria-label="Page précédente"
                    >
                        <ChevronLeft />
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        Page {page} sur {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="icon-sm"
                        disabled={page >= totalPages}
                        onClick={() => setPage(p => p + 1)}
                        aria-label="Page suivante"
                    >
                        <ChevronRight />
                    </Button>
                </div>
            )}

      <Button asChild className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 shadow-lg" variant="defaultBis" aria-label="Ajouter un vêtement">
        <Link to="clothes/new_clothing">
          <Plus aria-hidden="true" />
          <span className="hidden md:inline">
            Ajouter un vêtement
          </span>
        </Link>
      </Button>
    </>
);
}
