import { useClothes } from "../hooks/useClothes.js";
import ClothingCard from "../components/ClothingCard.jsx"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Link } from "@tanstack/react-router";

export default function WardrobeView() {
    const { isPending, isError, data, error } = useClothes();
    // useClothes va chercher la liste des vêtements depuis l'api
    // WardrobeView reçoit la liste et boucle dessus avec le .map

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: { error.message }</span>
    }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.length === 0 ? (
              <p>Aucun vêtement dans votre garde-robe pour le moment.</p>
          ) : (
              data.map(item =>
                  <ClothingCard key={item.id} clothing={item} />
              )
        )}
      </div>

      
      <Button asChild className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 shadow-lg" variant="defaultBis">
        <Link to="clothes/new_clothing">
          <Plus />
          <span className="hidden md:inline">
            Ajouter un vêtement
          </span>
        </Link>
      </Button>
    </>
);
}
