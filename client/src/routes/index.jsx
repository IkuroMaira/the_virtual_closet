import { createFileRoute } from '@tanstack/react-router'
import WardrobeView from '../features/wardrobe/views/WardrobeView.jsx'

// index.jsx correspond à la route "/" (page d'accueil)
export const Route = createFileRoute('/') ({
    component: HomePage,
})

function HomePage() {

    return (
        <>
            <WardrobeView />
        </>
    )
}
