import './App.css'
import ClotheForm from "./components/ClotheForm.jsx";
import { useState } from 'react'
// Ce que c'est : useState est un "hook" React qui permet de stocker des données dans le composant.
// Pourquoi : Quand on change ces données, React met automatiquement à jour l'affichage.
import { testConnection } from './services/api.jsx'

function App() {
  // État pour stocker la réponse du backend
  const [message, setMessage] = useState('Pas encore de connexion')
    // Décomposition :
    // - message : la variable qui contient la valeur actuelle
    // - setMessage : la fonction pour modifier message
    // - 'Pas encore de connexion' : la valeur initiale
    //
    // Exemple concret :
    // console.log(message)  // → 'Pas encore de connexion'
    // setMessage('Nouveau texte')
    // console.log(message)  // → 'Nouveau texte'

  // Fonction appelée quand on clique sur le bouton
  async function handleTestConnection() { // async signifie que cette fonction peut attendre des réponses (asynchrone).
    try {
      // Appel de la fonction testConnection depuis api.jsx
      const data = await testConnection()

      // Mise à jour de l'affichage avec la réponse
      setMessage(`Connexion réussie! Le backend dit: ${JSON.stringify(data)}`)

    } catch (error) {
      setMessage(`Erreur: ${error.message}`)
        // Ce que ça fait :
        // - Change la valeur de message
        // - React détecte le changement et réaffiche le composant
        // - Le nouveau texte apparaît à l'écran
    }
  }

  return (
    <>
      <h1>Test de Connexion React ↔ FastAPI</h1>

      <button onClick={handleTestConnection}>
        Tester la connexion au backend
      </button>

      {/*  Quand on clique :
            1. React appelle testConnection()
            2. La fonction fait l'appel API
            3. L'affichage se met à jour
        */}

      <p>{message}</p>
        <ClotheForm />
    </>
  )
}

export default App
