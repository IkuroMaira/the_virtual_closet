import { useParams, Link, useNavigate } from "@tanstack/react-router";
import { useClothing } from "../hooks/useClothing"
import { useDeleteClothing } from "../hooks/useDeleteClothing"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const display = (value) => value ?? "-"

export default function ClothingDetailView() {
  const { id } = useParams({ from: '/clothes/$id/' })
  const navigate = useNavigate()
  const { isPending, isError, data, error } = useClothing(id)
  const { mutate: deleteClothing } = useDeleteClothing()

  const handleDelete = () => {
    toast('Voulez-vous vraiment supprimer ce vêtement ?', {
      action: {
        label: 'Confirmer',
        onClick: () => deleteClothing(id, {
          onSuccess: () => {
            navigate({ to: '/' })
            toast.success('Le vêtement a bien été supprimé !')
          },
          onError: () => toast.error('Une erreur est survenue, veuillez réessayer.'),
        }),
      },
      cancel: {
        label: 'Annuler',
      },
    })
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
      <div className="flex gap-2">
        <Button asChild className="flex-1">
          <Link to="/clothes/$id/update" params={{ id }}>Modifier</Link>
        </Button>
        <Button variant="destructive" className="flex-1" onClick={handleDelete}>Supprimer</Button>
      </div>
    </div>
  </>;
}
