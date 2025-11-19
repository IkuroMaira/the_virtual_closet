import React, { useState, useContext } from "react";
import {ClothesContext} from "./Clothes.jsx";
const API_BASE_URL = '/api'

function AddClotheForm() {
    // Récupération du contexte pour accéder à fetchClothes
    const { fetchClothes, categories } = useContext(ClothesContext);

    // État pour les champs du formulaire
    const [clotheName, setClotheName] = useState("");
    // État pour le message si succès ou non
    const [message, setMessage] = useState("");
    // État pour le select Catégorie
    const [clotheCategory, setClotheCategory] = useState("");

    // Fonction pour gérer la soumission du formulaire
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
                        {categories.map((category) => (
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
    );
}

export default AddClotheForm;