// Ce fichier est là pour séparer le context de la logique

import { createContext } from 'react';

export const TagsContext = createContext({
    tags: [],
    fetchTags: () => {},
    categories: [],
    fetchCategories: () => {}
});
