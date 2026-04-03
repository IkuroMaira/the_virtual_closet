import { useClothes } from "../hooks/useClothes.js";
import { useEffect } from "react";
import ClothingCard from "../components/ClothingCard.jsx"
import { ClothesContext } from "../context/ClothesContext.jsx";

export default function WardrobeView() {
    const { clothes, fetchClothes } = useClothes()
    // userClothes va chercher la liste des vêtements depuis l'api
    // WardrobeView reçoit la liste et boucle dessus avec le .map

    useEffect(() => {
        fetchClothes();
    }, [fetchClothes]);


    return (
        <>
            <ClothesContext.Provider value={{ clothes, fetchClothes }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clothes.length === 0 ? (
                        <p>Aucun vêtement dans votre garde-robe pour le moment.</p>
                    ) : (
                        clothes.map(item =>
                            <ClothingCard key={item.id} clothing={item} />
                        )
                    )}
                </div>
            </ClothesContext.Provider>
        </>
);
}
