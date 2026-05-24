// Composant d'affichage pur

import { useTags } from '../hooks/useTags';
import { Plus, Pencil, Trash } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { useState } from 'react';
import { useCreateTag, useDeleteTag, useUpdateTag } from '../hooks/useMutateTag';


export default function TagsDisplay() {
    const { isPending, isError, data, error } = useTags();
    const {  mutate: createMutate, isPending: createPending, isError: createIsError, error: createError } = useCreateTag();
    const {  mutate: updateMutate, isPending: updatePending, isError: updateIsError, error: updateError } = useUpdateTag();
    const {  mutate: deleteMutate, isPending: deletePending, isError: deleteIsError, error: deleteError } = useDeleteTag();

    const [tagName, setTagName] = useState("");
    const [editingTagId, setEditingTagId] = useState(null);
    const [editingName, setEditingName] = useState("");

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
                            {editingTagId === tag.id ? (
                                <>
                                    <Input value={editingName} onChange={ (e) => setEditingName(e.target.value)} />
                                    <Button onClick={ () => 
                                    {updateMutate({tagId : tag.id, tagData: { name: editingName }}); setEditingTagId(null)}}>Sauvegarder</Button>
                                    <Button onClick={ () => setEditingTagId(null) }>Annuler</Button>
                                </>
                            ) : (
                                <>
                                 <Badge style={{ backgroundColor: tag.color }}>{ tag.name }</Badge>
                                    {tag.by_default === false && (
                                        <>
                                            <Button onClick={ () => {setEditingTagId(tag.id);setEditingName(tag.name)}}>< Pencil/></Button>
                                            <Button onClick={ () => deleteMutate(tag.id)}> <Trash /></Button> 
                                        </>
                                    ) 
                                    }
                                </>
                            )
               
                        }
                        </div>
                    ))
                }
                <Input value={tagName} onChange={ (e) => setTagName(e.target.value) }/>
                <Button onClick={ () => createMutate({ name: tagName })}>Ajouter un tag<Plus/></Button>
            </div>
        </>
    );
}
