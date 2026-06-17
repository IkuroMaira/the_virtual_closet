import { useNavigate, useParams } from "@tanstack/react-router"
import { toast } from "sonner"
import { useClothing } from "../hooks/useClothing"
import { useUpdateClothing } from "../hooks/useUpdateClothing"
import ClothingForm from "../components/ClothingForm"

export default function UpdateClothingView() {
  const { id } = useParams({ from: '/_authenticated/clothes/$id/update' })
  const { data, isPending, isError } = useClothing(id)
  const navigate = useNavigate()
  const { mutate } = useUpdateClothing()

  const handleSubmit = (formData) => {
    mutate(
      { ...formData, id: Number(id) },
      {
        onSuccess: () => {
          toast.success('Le vêtement a bien été modifié !')
          navigate({ to: `/clothes/${id}` })
        },
        onError: () => toast.error('Une erreur est survenue, veuillez réessayer.'),
      }
    )
  }

  if (isPending) return <span>Loading...</span>
  if (isError) return <span>Une erreur est survenue.</span>

  return <ClothingForm onSubmit={handleSubmit} clothingData={data} />
}
