import './App.css'
import { useState } from 'react'
import { testConnection } from './shared/services/api.jsx'
import ClothesDisplay from "./features/wardrobe/components/ClothesDisplay.jsx";
import TagsDisplay from "./features/tags/index.js";

function App() {
    const [message, setMessage] = useState('No connection yet');

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
            <h1>The Virtual Closet</h1>

            <button onClick={handleTestConnection}>
                Tester la connexion au backend
            </button>

            <p>{message}</p>

            <TagsDisplay />
            {/* Le composant ClothesDisplay affiche le formulaire et la liste */}
            <ClothesDisplay />
        </>
    )
}

export default App
