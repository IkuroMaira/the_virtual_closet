// Hooks customisé pour la logique
// Ici toute la logique de gestion des tags

import { useState, useCallback } from 'react';
import { getAllTags } from '../../../shared/services/tags_api';
// import { API_BASE_URL } from '../../../shared/services/api.jsx'

/* import dataTags from '../mockTags.json' */

export const useTags = () => {
    // À reprendre plus tard quand on refera la connexion au back avec ORM installé

/*     const [tags, setTags] = useState(dataTags) */
    const [tags, setTags] = useState([])

    const fetchTags = useCallback(async () => {
        const data = await getAllTags();
        setTags(data)
    }, []);

    return { tags, fetchTags }
/*     return {
        tags,
        fetchTags: async () => {
            const data = await getAllTags();
            setTags(data)
        }
    }; */
};