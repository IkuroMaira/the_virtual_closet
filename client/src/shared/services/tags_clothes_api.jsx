import { API_BASE_URL, getAuthHeaders } from "./api.jsx"

export async function getItemTags(itemId) {

    const response = await fetch(API_BASE_URL + `/clothes/${itemId}/tags`, {
        headers: await getAuthHeaders(),
    })

    if (!response.ok) {
        throw new Error(`Erreur HTTP! Status: ${response.status}`)
    }

    const data = await response.json()

    return data
}

export async function addTagToItem(itemId, tagId) {

    const response = await fetch(API_BASE_URL + `/clothes/${itemId}/tags/${tagId}`, {
        method: "POST",
        headers: await getAuthHeaders(),
    })

    if (!response.ok) {
        throw new Error(`Erreur HTTP! Status: ${response.status}`)
    }

    const data = await response.json()

    return data
}

export async function deleteTagFromItem(itemId, tagId) {

    const response = await fetch(API_BASE_URL + `/clothes/${itemId}/tags/${tagId}`, {
        method: "DELETE",
        headers: await getAuthHeaders(),
    })

    if (!response.ok) {
        throw new Error(`Erreur HTTP! Status: ${response.status}`) 
    }

    const data = await response.json()

    return data 
}