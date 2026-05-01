// Composant d'affichage pur

import { useEffect } from 'react';
import { useTags } from '../hooks/useTags';
import { TagsContext } from '../context/TagsContext';
import { Badge } from "@/components/ui/badge"



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
                    <p>Il y a { tags.length } tags !</p>
                )}
            </div>
            <div className="flex w-full flex-wrap justify-center gap-2">
                <h3>Tous mes tags :</h3>
                {
                    tags.map((tag) => (
                        <div key={tag.id}>
                            <Badge style={{ backgroundColor: tag.color }}>{ tag.name }</Badge>
                        </div>
                    ))
                }
            </div>
        </TagsContext.Provider>
    );
}
