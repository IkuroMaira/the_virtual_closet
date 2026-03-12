import { createFileRoute } from '@tanstack/react-router'
import ClothesDisplay from '../features/wardrobe/components/ClothesDisplay.jsx'

// index.jsx correspond à la route "/" (page d'accueil)
export const Route = createFileRoute('/') ({
    component: HomePage,
})

function HomePage() {

    return (
        <>
            <ClothesDisplay />
        </>
    )
}
