// URL de base pour toutes les requêtes API
// Le proxy Vite redirige /api vers http://localhost:8000
const API_BASE_URL = '/api'

/**
 * Fonction pour tester la connexion avec le backend
 * @returns {Promise} - Retourne les données du backend
 */
export async function testConnection() {
  console.log('=> Appel testConnection()')

  try {
    // Envoi de la requête GET vers la racine de l'API
    console.log('=> Envoi de la requête vers', API_BASE_URL + '/')
    const response = await fetch(API_BASE_URL + '/')
      // Décomposition :
      // - fetch('/api/') : fait une requête HTTP vers /api/
      // - await : attend que la réponse arrive (ne bloque pas la page)
      // - response : contient la réponse du serveur
      //
      // Ce qui se passe :
      // 1. React envoie : GET /api/
      // 2. Vite intercepte et redirige vers : GET http://localhost:8000/
      // 3. FastAPI répond : {"Hello": "World"}
      // 4. Vite renvoie la réponse à React

    // Vérifier si la réponse est OK (status 200-299)
    if (!response.ok) {
      throw new Error(`Erreur HTTP! Status: ${response.status}`)
    }

    console.log('=> Réponse reçue:', response)

    // Transformer la réponse en JSON
    const data = await response.json()
      // Ce que ça fait :
      // - La réponse arrive en texte brut : '{"Hello":"World"}'
      // - .json() la transforme en objet JavaScript : {Hello: "World"}
    console.log('=> Données:', data)

    return data

  } catch (error) {
    console.error('=> Erreur dans testConnection:', error)
    throw error  // Renvoyer l'erreur pour que le composant puisse la g�rer
  }
}

