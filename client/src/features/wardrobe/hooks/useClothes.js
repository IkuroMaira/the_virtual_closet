import { useState, useCallback } from "react";

const API_BASE_URL = 'http://localhost:8000/api'

export const useClothes = () => {
    const [clothes, setClothes] = useState([]);
    const [categories, setCategories] = useState([])

    const fetchClothes = useCallback(async () => {
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
    }, []);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await fetch(API_BASE_URL + "/clothes/categories");

            if (!response.ok) {
                throw new Error(`Erreur HTTP! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Catégories récupérées:", data);
            setCategories(data.categories);
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories:", error);
        }
    }, []);

    return {
        clothes,
        fetchClothes,
        categories,
        fetchCategories
    }
}
