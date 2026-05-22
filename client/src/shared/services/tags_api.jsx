import { API_BASE_URL } from "./api.jsx"

export async function getAllTags() {
    const response = await fetch(API_BASE_URL + '/tags/')

    if (!response.ok) {
        throw new Error(`Erreur HTTP! Status: ${response.status}`)
    }

    const data = await response.json()

    return data
}