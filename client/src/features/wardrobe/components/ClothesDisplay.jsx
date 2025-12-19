import { useClothes } from "../hooks/useClothes.js";
import { useEffect, useState } from "react";
import { ClothesContext } from "../context/ClothesContext.jsx";

const API_BASE_URL = import.meta.env.VITE_API_URL

export  default function ClothesDisplay() {
    const { clothes, fetchClothes, categories, fetchCategories } = useClothes()

    // État pour les champs du formulaire
    const [clotheName, setClotheName] = useState("");
    // État pour le message si succès ou non
    const [message, setMessage] = useState("");
    // État pour le select avec les catégories
    const [clotheCategory, setClotheCategory] = useState("");

    useEffect(() => {
        fetchClothes();
        fetchCategories();
    }, [fetchClothes, fetchCategories]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(API_BASE_URL + "/clothes/new_clothe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: clotheName,
                    category: clotheCategory,
                }),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Vêtement ajouté:", data);

            // Réinitialiser le formulaire
            setClotheName("");
            setClotheCategory("");
            setMessage("Vêtement ajouté avec succès!");

            // Rafraîchir la liste des vêtements
            fetchClothes();

            // Effacer le message après 3 secondes
            setTimeout(() => setMessage(""), 3000);
        } catch (error) {
            console.error("Erreur lors de l'ajout du vêtement:", error);
            setMessage("Erreur lors de l'ajout du vêtement");
        }
    };

    return (
        <ClothesContext.Provider value={{ clothes, fetchClothes, categories, fetchCategories }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "50px" }}>
                <h2>Mon Dressing Virtuel</h2>

                <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "5px", marginTop: "20px" }}>
                    <h3>Ajouter un vêtement</h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: "10px" }}>
                            <label>Nom du vêtement: </label>
                            <input
                                type="text"
                                value={clotheName}
                                onChange={(e) => setClotheName(e.target.value)}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <label>Catégorie: </label>
                            <select
                                value={clotheCategory}
                                onChange={(e) => setClotheCategory(e.target.value)}
                                required
                            >
                                <option value="">-- Sélectionnez une catégorie --</option>
                                {categories && categories.map((category) => (
                                    <option key={category.value} value={category.value}>
                                        {category.value}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit">Ajouter</button>
                    </form>
                    {message && <p style={{ marginTop: "10px"}}>{message}</p>}
                </div>

                {clothes.length === 0 ? (
                    <p>Aucun vêtement dans votre garde-robe pour le moment.</p>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
                        {clothes.map((clothe) => (
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
