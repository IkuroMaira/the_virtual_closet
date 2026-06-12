import { createFileRoute } from '@tanstack/react-router'
import UpdateClothingView from '../../../features/wardrobe/views/UpdateClothingView'

export const Route = createFileRoute('/clothes/$id/update')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <UpdateClothingView />
    </>
  )
}
