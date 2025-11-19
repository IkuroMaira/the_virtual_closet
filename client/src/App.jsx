import './App.css'
import ClotheForm from "./components/ClotheForm.jsx";
import { useState } from 'react'
import { testConnection } from './services/api.jsx'

function App() {
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
      <h1>Test de Connexion React ↔ FastAPI</h1>

      <button onClick={handleTestConnection}>
        Tester la connexion au backend
      </button>

      <p>{message}</p>
        <ClotheForm />
    </>
  )
}

export default App
