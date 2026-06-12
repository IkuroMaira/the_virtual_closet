import { useParams, Link } from "@tanstack/react-router";
import { useClothing } from "../hooks/useClothing"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const display = (value) => value ?? "-"

export default function ClothingDetailView() {
  const { id } = useParams({ from: '/clothes/$id/' })
  const { isPending, isError, data, error } = useClothing(id)
  
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
        <dt>Nom:</dt>
        <dd className="text-muted-foreground">{display(data.name)}</dd>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>Catégorie:</dt>
        <dd className="text-muted-foreground">{display(data.category)}</dd>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>Couleur:</dt>
        <dd className="text-muted-foreground">{display(data.color)}</dd>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>Taille:</dt>
        <dd className="text-muted-foreground">{display(data.size)}</dd>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>Style:</dt>
        <dd className="text-muted-foreground">{display(data.style)}</dd>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>Saison:</dt>
        <dd className="text-muted-foreground">{display(data.season)}</dd>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>Matière(s):</dt>
        <dd className="text-muted-foreground">{display(data.materials)}</dd>
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
        <dt>ID de la marque:</dt>
        <dd className="text-muted-foreground">{display(data.brand_id)}</dd>
      </dl>
      <Separator />
      <Button asChild>
        <Link to="/clothes/$id/update" params={{ id }}>Modifier</Link>
      </Button>
    </div>
  </>;
}
