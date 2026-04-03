import { createFileRoute } from '@tanstack/react-router'
import ClothingDetailView from "@/features/wardrobe/views/ClothingDetailView.jsx";

export const Route = createFileRoute('/clothes/$id')({
  component: ClothingDetail,
})

function ClothingDetail() {
    const { id } = Route.useParams()
  return (
      <>
          <ClothingDetailView />
      </>
  )
}
