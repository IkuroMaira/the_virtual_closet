import { useEffect, useState, createContext } from "react";
import AddClotheForm from "./AddClotheForm";
import Tags from "../tags/Tags.jsx";
const API_BASE_URL = '/api'

// Création du contexte pour partager les données entre composants
const ClothesContext = createContext({
  clothes: [],
  fetchClothes: () => {},
  categories: [],
  fetchCategories: () => {}
});

export { ClothesContext };

export default function Clothes() {
  const [clothes, setClothes] = useState([]);
  const [categories, setCategories] = useState([])

  const fetchClothes = async () => {
    try {
      const response = await fetch(API_BASE_URL + '/clothes/');

      if (!response.ok) {
        throw new Error(`Error HTTP! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Vêtements récupérés:", data);

      setClothes(data.clothes || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des vêtements:", error);
      setClothes([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(API_BASE_URL + "/clothes/categories");

      if (!response.ok) {
        throw new Error(`Erreur HTTP! Status: ${response.status}`);
      }

      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };

  // useEffect pour charger les vêtements automatiquement au montage du composant
  useEffect(() => {
    fetchClothes();
    fetchCategories()
  }, []); // Le tableau vide [] signifie "exécuter une seule fois au montage"

  return (
    <ClothesContext.Provider value={{ clothes, fetchClothes, categories, fetchCategories }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", paddingTop: "50px" }}>
        <h2>Mon Dressing Virtuel</h2>

        <AddClotheForm />
        <Tags />

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
