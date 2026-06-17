import { useParams, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useClothing } from "../hooks/useClothing"
import { useDeleteClothing } from "../hooks/useDeleteClothing"
import { useSignedUrl } from "../hooks/useSignedUrl"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const display = (value) => value ?? "-"

export default function ClothingDetailView() {
  const { id } = useParams({ from: '/_authenticated/clothes/$id/' })
  const navigate = useNavigate()
  const { isPending, isError, data, error } = useClothing(id)
  const { mutate: deleteClothing } = useDeleteClothing()
  const signedUrl = useSignedUrl(data?.picture)

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

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl">
      <Link
        to="/"
        className="flex items-center justify-center w-9 h-9 rounded-full bg-muted hover:bg-muted/70 transition-colors self-start"
        aria-label="Retour au catalogue"
      >
        <ArrowLeft className="w-4 h-4" />
      </Link>
    <div className="flex flex-col md:flex-row gap-8 w-full">
      <div className="w-full md:w-1/2 md:sticky md:top-8 md:self-start">
        {signedUrl ? (
          <img
            src={signedUrl}
            alt={data.name}
            className="w-full rounded-md object-cover aspect-4/5"
          />
        ) : (
          <div className="w-full aspect-4/5 rounded-md bg-muted flex items-center justify-center text-muted-foreground text-sm">
            Aucune photo
          </div>
        )}
      </div>

      <div className="flex w-full md:w-1/2 flex-col gap-2 text-sm">
        <h1 className="text-2xl font-semibold mb-2">{data.name}</h1>
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
        {/* <dl className="flex items-center justify-between">
          <dt>ID de la marque:</dt>
          <dd className="text-muted-foreground">{display(data.brand_id)}</dd>
        </dl>
        <Separator />*/}
        <div className="flex gap-2 mt-4">
          <Button asChild className="flex-1">
            <Link to="/clothes/$id/update" params={{ id }}>Modifier</Link>
          </Button>
          <Button variant="destructive" className="flex-1" onClick={handleDelete}>Supprimer</Button>
        </div>
      </div>
    </div>
    </div>
  );
}
