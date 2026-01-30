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
                    <p>Il y a { tags.table_tags.length } tags !</p>
                )}
            </div>
            <div>
                <h3>Tous mes tags</h3>
                {
                    tags.table_tags.map((tag, index) => (
                        <div key={index}>
                            <p>tag.id</p>
                            <p>Name : { tag.name }</p>
                            <p>Color : { tag.color }</p>
                            <p>Par défaut : { tag.by_default }</p>
                            <p>ID User : { tag.id_user }</p>
                        </div>
                    ))
                }
            </div>
        </TagsContext.Provider>
    );
}
