// Hooks customisé pour la logique
// Ici toute la logique de gestion des tags

import { useState } from 'react';
// import { API_BASE_URL } from '../../../shared/services/api.jsx'

import dataTags from '../mockTags.json'

export const useTags = () => {
    // À reprendre plus tard quand on refera la connexion au back avec ORM installé

    const [tags, setTags] = useState(dataTags)

    return {
        tags,
        fetchTags: () => {}
    };
};