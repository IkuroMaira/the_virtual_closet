import { useClothes } from "../hooks/useClothes.js";
import ClothingCard from "../components/ClothingCard.jsx"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { IconShirt } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router";

export default function WardrobeView() {
    const { isPending, isError, data, error } = useClothes();

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

            <Button asChild className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 shadow-lg" variant="defaultBis">
                <Link to="/clothes/new_clothing">
                    <Plus />
                    <span className="hidden md:inline">
                        Ajouter un vêtement
                    </span>
                </Link>
            </Button>
        </>
    );
}
