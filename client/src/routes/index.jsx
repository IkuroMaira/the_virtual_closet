import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { testConnection } from '../shared/services/api.jsx'
import ClothesDisplay from '../features/wardrobe/components/ClothesDisplay.jsx'
import TagsDisplay from '../features/tags/index.js'

// index.jsx correspond à la route "/" (page d'accueil)
export const Route = createFileRoute('/') ({
    component: HomePage,
})

function HomePage() {
    const [message, setMessage] = useState('No connection yet')

    async function handleTestConnection() {
        try {
            const data = await testConnection()
            setMessage(`Connection successful! The backend says: ${JSON.stringify(data)}`)
        } catch (error) {
            setMessage(`Error: ${error.message}`)
        }
    }

    return (
        <>
            <button onClick={handleTestConnection}>
                Tester la connexion au backend
            </button>

            <p>{message}</p>

            <ClothesDisplay />
        </>
    )
}
