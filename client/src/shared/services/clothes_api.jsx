import { API_BASE_URL } from "./api.jsx"

/**
 * Function to get all clothes with the backend
 * @returns {Promise} - Returns the backend datas
 */
export async function getAllClothes() {
    console.log('=> Appel : getAllClothes()')

    try {
        console.log('=> Envoi de la requête vers', API_BASE_URL + '/clothes/')
        const response = await fetch(API_BASE_URL + '/clothes/')

        if (!response.ok) {
            throw new Error(`Erreur HTTP! Status: ${response.status}`)
        }

        console.log('=> Réponse reçue:', response)

        const data = await response.json()
        console.log('=> Données:', data)

        return data

    } catch (error) {
        console.error('=> Erreur dans getClothes:', error)
        throw error
    }
}
