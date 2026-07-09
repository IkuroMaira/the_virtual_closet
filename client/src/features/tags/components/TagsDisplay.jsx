import { useTags } from '../hooks/useTags';
import { Plus, Pencil, Trash } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import { useCreateTag } from '../hooks/useCreateTag';
import { useUpdateTag } from '../hooks/useUpdateTag';
import { useDeleteTag } from '../hooks/useDeleteTag';
import { getContrastColor } from '../../../shared/utils/color';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


export default function TagsDisplay() {
    const { isPending, isError, data, error } = useTags();
    const { mutate: createMutate, isError: createIsError, error: createError } = useCreateTag();
    const { mutate: updateMutate, isSuccess: updateIsSuccess } = useUpdateTag();
    const { mutate: deleteMutate } = useDeleteTag();

    const [tagName, setTagName] = useState("");
    const [editingTagId, setEditingTagId] = useState(null);
    const [editingName, setEditingName] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    const isNameValid = /^[a-zA-ZÀ-ÿ0-9 \-_]+$/.test(tagName.trim())
    const isEditingName = /^[a-zA-ZÀ-ÿ0-9 \-_]+$/.test(editingName.trim())

    if (isPending) {
        return <span>Loading ...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    const defaultTags = data.filter(tag => tag.by_default === true)
    const customTags = data.filter(tag => tag.by_default === false)
    const customTagsCount = customTags.length

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
            {isCreating && (
                <div className="flex items-center gap-2 flex-wrap">
                    <Input placeholder="Nom du tag" className="w-48" value={tagName} onChange={(e) => setTagName(e.target.value)} />
                    {createIsError && (
                        <p className="text-red-500">{createError.message}</p>
                    )}
                    {tagName.trim().length >= 2 && !isNameValid && (
                        <p className="text-red-500">Caractères autorisés : lettres, chiffres, tiret, underscore, espace</p>
                    )}
                    <Button onClick={() => { createMutate({ name: tagName.trim() }, { onSuccess: () => { setTagName(""); setIsCreating(false) } }) }} disabled={tagName.trim().length < 2 || !isNameValid}>Valider</Button>
                    <Button variant="destructive" onClick={() => { setIsCreating(false); setTagName("") }}>Annuler</Button>
                </div>
            )}

            {customTagsCount >= 50 && (
                <p className="text-red-500">Vous avez atteint la limite de 50 tags personnalisés</p>
            )}

            {updateIsSuccess && (
                <p className="text-green-600">Tag modifié avec succès</p>
            )}

            <div className="border rounded-lg overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-semibold">Mes tags</h2>
                    <Button onClick={() => setIsCreating(true)} disabled={customTagsCount >= 50}>
                        Ajouter un tag <Plus />
                    </Button>
                </div>

                <Table>
                    <TableBody>
                        <TableRow className="bg-muted/50 hover:bg-muted/50">
                            <TableCell colSpan={2} className="text-muted-foreground font-semibold py-2">Défaut</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead className="py-2">Tag</TableHead>
                            <TableHead className="text-right py-2">Actions</TableHead>
                        </TableRow>
                        {defaultTags.map(tag => (
                            <TableRow key={tag.id}>
                                <TableCell className="py-3"><Badge style={{ backgroundColor: tag.color, color: getContrastColor(tag.color) }}>{tag.name}</Badge></TableCell>
                                <TableCell />
                            </TableRow>
                        ))}

                        <TableRow className="bg-muted/50 hover:bg-muted/50">
                            <TableCell colSpan={2} className="text-muted-foreground font-semibold py-2">Personnalisés ({customTagsCount}/50)</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead className="py-2">Tag</TableHead>
                            <TableHead className="text-right py-2">Actions</TableHead>
                        </TableRow>
                        {customTags.map(tag => (
                            <TableRow key={tag.id}>
                                <TableCell className="py-3">
                                    {editingTagId === tag.id ? (
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Input value={editingName} onChange={(e) => setEditingName(e.target.value)} className="w-48" />
                                            {editingName.trim().length >= 2 && !isEditingName && (
                                                <p className="text-red-500">Caractères autorisés : lettres, chiffres, tiret, underscore, espace</p>
                                            )}
                                        </div>
                                    ) : (
                                        <Badge style={{ backgroundColor: tag.color, color: getContrastColor(tag.color) }}>{tag.name}</Badge>
                                    )}
                                </TableCell>
                                <TableCell className="text-right py-3">
                                    {editingTagId === tag.id ? (
                                        <div className="flex justify-end gap-2">
                                            <Button onClick={() => { updateMutate({ tagId: tag.id, tagData: { name: editingName } }); setEditingTagId(null) }} disabled={editingName.trim().length < 2 || !isEditingName}>Sauvegarder</Button>
                                            <Button variant="destructive" onClick={() => setEditingTagId(null)}>Annuler</Button>
                                        </div>
                                    ) : (
                                        <div className="flex justify-end gap-1">
                                            <Button aria-label={`Modifier le tag ${tag.name}`} onClick={() => { setEditingTagId(tag.id); setEditingName(tag.name) }} variant="ghost"><Pencil aria-hidden="true" /></Button>
                                            <Button aria-label={`Supprimer le tag ${tag.name}`} onClick={() => deleteMutate(tag.id)} variant="ghost"><Trash aria-hidden="true" /></Button>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
