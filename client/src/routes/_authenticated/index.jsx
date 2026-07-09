import { createFileRoute } from '@tanstack/react-router'
import WardrobeView from '@/features/wardrobe/views/WardrobeView.jsx'

export const Route = createFileRoute('/_authenticated/')({
    component: HomePage,
})

function HomePage() {
    return (
        <>
            <WardrobeView />
        </>
    )
}
