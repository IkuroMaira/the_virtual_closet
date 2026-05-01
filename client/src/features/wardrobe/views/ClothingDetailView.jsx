import { useParams } from "@tanstack/react-router";
import { useClothing } from "../hooks/useClothing"
import { Separator } from "@/components/ui/separator"

export default function ClothingDetailView() {
  const { id } = useParams({ from: '/clothes/$id' })
  const { isPending, isError, data, error } = useClothing(id)
  
  if (isPending) {
    return <span>Loading..</span>
  }
  
  if (isError) {
    return <span>Error: `{error.message}`</span>
  }
  
  return <>
    <div className="flex w-full max-w-sm flex-col gap-2 text-sm">
      <dl className="flex items-center justify-between">
        <dt>{data.name}</dt>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>{data.category}</dt>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>{data.color}</dt>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>{data.size}</dt>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>{data.style}</dt>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>Saison</dt>
        <dd className="text-muted-foreground">{data.season}</dd>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>{data.materials}</dt>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>Note:</dt>
        <dd className="text-muted-foreground">{data.note}</dd>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>Commentaire:</dt>
        <dd className="text-muted-foreground">{data.comment}</dd>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>ID de la marque: {data.brand_id}</dt>
      </dl>
      <Separator />
    </div>
  </>;
}
