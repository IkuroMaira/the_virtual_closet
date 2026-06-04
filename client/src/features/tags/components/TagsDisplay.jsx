// Composant d'affichage pur
import { useTags } from '../hooks/useTags';
import { Plus, Pencil, Trash } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import { useCreateTag } from '../hooks/useCreateTag';
import { useUpdateTag } from '../hooks/useUpdateTag';
import { useDeleteTag } from '../hooks/useDeleteTag';


export default function TagsDisplay() {
    const { isPending, isError, data, error } = useTags();
    const {  mutate: createMutate, isPending: createPending, isError: createIsError, error: createError } = useCreateTag();
    const {  mutate: updateMutate, isPending: updatePending, isError: updateIsError, error: updateError, isSuccess: updateIsSuccess } = useUpdateTag();
    const {  mutate: deleteMutate, isPending: deletePending, isError: deleteIsError, error: deleteError } = useDeleteTag();

    const [tagName, setTagName] = useState("");
    const [editingTagId, setEditingTagId] = useState(null);
    const [editingName, setEditingName] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    const isNameValid = /^[a-zA-ZÀ-ÿ0-9 \-_]+$/.test(tagName.trim())
    const isEditingName = /^[a-zA-ZÀ-ÿ0-9 \-_]+$/.test(editingName.trim())
    
    if (isPending) {
        return <span> Loading ...</span>
    }

    if (isError) {
        return <span>Error: `{error.message}`</span>
    }

    const customTagsCount = data.filter(tag => tag.by_default === false).length

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
                        <div key={tag.id} className="flex items-center">
                            {editingTagId === tag.id ? (
                                <>
                                    <Input value={editingName} onChange={ (e) => setEditingName(e.target.value)} />
                                    {  editingName.trim().length >= 2 && !isEditingName && (
                                        <p className="text-red-500"> Caractères autorisés : lettres, chiffres, tiret, underscore, espace </p>
                                    )
                                    }
                                    <Button onClick={ () => 
                                    {updateMutate({tagId : tag.id, tagData: { name: editingName }}); setEditingTagId(null)}} disabled={editingName.trim().length < 2 || !isEditingName}>Sauvegarder</Button>
                                    <Button onClick={ () => setEditingTagId(null) }>Annuler</Button>
                                </>
                            ) : (
                                <>
                                 <Badge style={{ backgroundColor: tag.color }}>{ tag.name }</Badge>
                                    {tag.by_default === false && (
                                        <>
                                            <Button onClick={ () => {setEditingTagId(tag.id);setEditingName(tag.name)}} variant="ghost">< Pencil size="icon" /></Button>
                                            <Button onClick={ () => deleteMutate(tag.id)} variant="ghost"> <Trash /></Button> 
                                        </>
                                    ) 
                                    }
                                </>
                            )
               
                        }
                        </div>
                    ))
                }
                { updateIsSuccess && (
                        <p> Tag modifié avec succès</p>
                )}
                { isCreating === false ? (
                    <>
                        <Button onClick={ (e) => setIsCreating(true) } disabled={ customTagsCount >= 50 }>Ajouter un tag<Plus/></Button>
                        { customTagsCount >= 50 && (
                            <p> Vous avez atteint la limite de 50 tags personnalisés </p>
                        )}
                    </>
                ) : (
                    <>
                        <Input placeholder="Nom du tag"  className="w-48" value={tagName} onChange={ (e) => setTagName(e.target.value) }/>
                            { createIsError  && (
                                <p className="text-red-500"> {createError.message} </p>
                            )}
                            {  tagName.trim().length >= 2 && !isNameValid && (
                                <p className="text-red-500"> Caractères autorisés : lettres, chiffres, tiret, underscore, espace </p>
                            )
                            }
                        <Button onClick={ () => { createMutate({ name: tagName.trim() }, {onSuccess: () => {setTagName(""); setIsCreating(false)}}) }} disabled={tagName.trim().length < 2 || !isNameValid} > Valider </Button>
                        <Button onClick={ () => { setIsCreating(false); setTagName("") }}>Annuler</Button>
                    </>
                )}

            </div>
        </>
    );
}
