import { createFileRoute } from '@tanstack/react-router'
import AddClothingView from '@/features/wardrobe/views/AddClothingView.jsx'

export const Route = createFileRoute('/_authenticated/clothes/new_clothing')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <AddClothingView />
        </>
    )
}
