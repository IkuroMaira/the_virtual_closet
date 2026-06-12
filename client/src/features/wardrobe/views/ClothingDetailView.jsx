import { useParams, Link, useNavigate } from "@tanstack/react-router";
import { useClothing } from "../hooks/useClothing"
import { useDeleteClothing } from "../hooks/useDeleteClothing"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const display = (value) => value ?? "-"

export default function ClothingDetailView() {
  const { id } = useParams({ from: '/clothes/$id/' })
  const navigate = useNavigate()
  const { isPending, isError, data, error } = useClothing(id)
  const { mutate: deleteClothing } = useDeleteClothing()

  const handleDelete = () => {
    deleteClothing(id, { onSuccess: () => navigate({ to: '/' }) })
  }
  
  if (isPending) {
    return <span>Loading...</span>
  }
  
  if (isError) {
    if (error.message === 'Erreur HTTP! Status: 404') {
      return <span>Not Found</span>
    }
    return <span>Error: { error.message }</span>
  }

  return <>
    <div className="flex w-full max-w-sm flex-col gap-2 text-sm">
      <dl className="flex items-center justify-between">
        <dt>{display(data.name)}</dt>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>{display(data.category)}</dt>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>{display(data.color)}</dt>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>{display(data.size)}</dt>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>{display(data.style)}</dt>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>Saison</dt>
        <dd className="text-muted-foreground">{display(data.season)}</dd>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>{display(data.materials)}</dt>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>Note:</dt>
        <dd className="text-muted-foreground">{display(data.note)}</dd>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>Commentaire:</dt>
        <dd className="text-muted-foreground">{display(data.comment)}</dd>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>ID de la marque: {display(data.brand_id)}</dt>
      </dl>
      <Separator />
      <div className="flex gap-2">
        <Button asChild className="flex-1">
          <Link to="/clothes/$id/update" params={{ id }}>Modifier</Link>
        </Button>
        <Button variant="destructive" className="flex-1" onClick={handleDelete}>Supprimer</Button>
      </div>
    </div>
  </>;
}
