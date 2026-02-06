import { useClothes } from "../hooks/useClothes.js";
import { useEffect } from "react";
import { ClothesContext } from "../context/ClothesContext.jsx";

export  default function ClothesDisplay() {
    const { clothes, fetchClothes } = useClothes()

    useEffect(() => {
        fetchClothes();
    }, [fetchClothes]);


    return (
        <ClothesContext.Provider value={{ clothes, fetchClothes }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "50px" }}>
                <h2>Mon Dressing Virtuel</h2>

                {clothes.table_clothes.length === 0 ? (
                    <p>Aucun vêtement dans votre garde-robe pour le moment.</p>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
                        {clothes.table_clothes.map((clothe) => (
                            <div key={clothe.id} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                                <strong>{clothe.name}</strong> - {clothe.category}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </ClothesContext.Provider>
    );
}
