// Composant d'affichage pur

import { useEffect } from 'react';
import { useTags } from '../hooks/useTags';
import { TagsContext } from '../context/TagsContext';

export default function TagsDisplay() {
    const { tags, fetchTags } = useTags();

    useEffect(() => {
        fetchTags();
    }, [fetchTags]);

    return (
        <TagsContext.Provider value={{ tags, fetchTags }}>
            <div>
                <h2>Est-ce qu'il y a des tags en base de données ?</h2>
                {tags.length === 0 ? (
                    <p>Aucun tags pour le moment.</p>
                ) : (
                    <p>Il y a des tags !</p>
                )}
            </div>
        </TagsContext.Provider>
    );
}
