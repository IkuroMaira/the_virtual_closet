import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"
import { useCreateClothing } from "../hooks/useCreateClothing"
import ClothingForm from "../components/ClothingForm"

export default function AddClothingView() {
  const navigate = useNavigate()
  const { mutate } = useCreateClothing({
    onSuccess: () => {
      toast.success('Le vêtement a bien été ajouté au dressing !')
      navigate({ to: '/' })
    },
    onError: () => toast.error('Une erreur est survenue, veuillez réessayer.'),
  })

  return <ClothingForm onSubmit={(data) => mutate(data)} />
}
