import { API_BASE_URL } from "./api.jsx"

/**
 * Function to get all clothes with the backend
 * @returns {Promise} - Returns the backend datas
 */
export async function getAllClothes() {
    try {
        const response = await fetch(`${API_BASE_URL}/clothes/`)

        if (!response.ok) {
            throw new Error(`Erreur HTTP! Status: ${response.status}`)
        }

        const datas = await response.json()

        return datas

    } catch (error) {
        console.error('=> Erreur dans getAllClothes:', error)
        throw error
    }
}

/**
 * Function to get one item with the backend
 * @returns {Promise} - Returns the backend datas
 */
export async function getItem(item_id) {
    try {
        const response = await fetch(`${API_BASE_URL}/clothes/${item_id}`)

        if (!response.ok) {
            throw new Error(`Erreur HTTP! Status: ${response.status}`)
        }

        const data = await response.json()

        return data
    } catch (error) {
        console.error('=> Erreur dans getItem:', error)
        throw error
    }
}
