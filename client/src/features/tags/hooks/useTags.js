// Hooks customisé pour la logique
// Ici toute la logique de gestion des tags

import { useState, useCallback } from 'react';

const API_BASE_URL = '/api';

export const useTags = () => {
    const [tags, setTags] = useState([]);

    const fetchTags = useCallback(async () => {
        try {
            const response = await fetch(API_BASE_URL + '/tags/');

            if (!response.ok) {
                throw new Error(`Error HTTP! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Les tags sont récupérés", data);

            setTags(data.tags || []);
        } catch (error) {
            console.error("Erreur lors de la récupération des tags", error);
            setTags([]);
        }
    }, []);

    return {
        tags,
        fetchTags
    };
};