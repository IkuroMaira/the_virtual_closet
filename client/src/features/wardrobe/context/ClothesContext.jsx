import { createContext } from "react";

export const ClothesContext = createContext({
    clothes: [],
    fetchClothes: () => {},
    categories: [],
    fetchCategories: () => {}
})
