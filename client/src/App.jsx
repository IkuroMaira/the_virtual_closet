import './App.css'
import Clothes from "./features/wardrobe/Clothes.jsx";
import { useState } from 'react'
import { testConnection } from './shared/services/api.jsx'

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

      {/* Le composant Clothes affiche la liste et fournit le contexte pour AddClotheForm */}
      <Clothes />
    </>
  )
}

export default App
