// Composant d'affichage pur

import { useTags } from '../hooks/useTags';
import { Badge } from "@/components/ui/badge"



export default function TagsDisplay() {
    const { isPending, isError, data, error } = useTags();

    if (isPending) {
        return <span> Loading ...</span>
    }

    if (isError) {
        return <span>Error: `{error.message}`</span>
    }

    return (
        <>
            <div>
                <h2>Est-ce qu'il y a des tags en base de données ?</h2>
                {data.length === 0 ? (
                    <p>Aucun tags pour le moment.</p>
                ) : (
                    <p>Il y a { data.length } tags !</p>
                )}
            </div>
            <div className="flex w-full flex-wrap justify-center gap-2">
                <h3>Tous mes tags :</h3>
                {
                    data.map((tag) => (
                        <div key={tag.id}>
                            <Badge style={{ backgroundColor: tag.color }}>{ tag.name }</Badge>
                        </div>
                    ))
                }
            </div>
        </>
    );
}
