import { API_BASE_URL } from "./api.jsx"

export async function getAllTags() {
    console.log('Appel: getAllTags()')

    try {
        console.log('Envoi de la requête vers', API_BASE_URL + '/tags/')
        const response = await fetch(API_BASE_URL + '/tags/')

        if (!response.ok) {
            throw new Error(`Erreur HTTP! Status: ${response.status}`) 
        }

        console.log('Réponse reçue:', response)

        const data = await response.json()
        console.log('Données:', data)

        return data
        
    } catch (error) {
        console.error('Erreur dans getAllTags', error)
        throw error
    }
}