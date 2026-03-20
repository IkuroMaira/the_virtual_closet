import { useState } from "react";

import { getAllClothes } from "@/shared/services/clothes_api.jsx"

export const useClothes = () => {

    const [clothes, setClothes] = useState([]);

    return {
        clothes,
        fetchClothes: async () => {
            const data = await getAllClothes();
            setClothes(data)
        },
    }
}
