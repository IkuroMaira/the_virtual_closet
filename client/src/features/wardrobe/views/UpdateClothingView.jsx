import { useNavigate, useParams } from "@tanstack/react-router"
import { toast } from "sonner"
import { useClothing } from "../hooks/useClothing"
import { useUpdateClothing } from "../hooks/useUpdateClothing"
import ClothingForm from "../components/ClothingForm"

export default function UpdateClothingView() {
  const { id } = useParams({ from: '/clothes/$id/update' })
  const { data } = useClothing(id)
  const navigate = useNavigate()
  const { mutate } = useUpdateClothing()

  const handleSubmit = (formData) => {
    mutate(
      { ...formData, id },
      {
        onSuccess: () => {
          toast.success('Le vêtement a bien été modifié !')
          navigate({ to: `/clothes/${id}` })
        },
        onError: () => toast.error('Une erreur est survenue, veuillez réessayer.'),
      }
    )
  }

  return <ClothingForm onSubmit={handleSubmit} clothingData={data} />
}
