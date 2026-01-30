import { useState } from "react";
// import { API_BASE_URL } from '../../../shared/services/api.jsx'

import dataClothes from '../mockClothes.json'

export const useClothes = () => {
    // À reprendre plus tard quand on refera la connexion au back avec ORM installé

    const [clothes, setClothes] = useState(dataClothes);

    return {
        clothes,
        fetchClothes: () => {},
    }
}
