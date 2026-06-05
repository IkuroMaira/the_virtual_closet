import { API_BASE_URL } from "./api.jsx"

export async function getAllTags() {
    const response = await fetch(API_BASE_URL + '/tags/')

    const response = await fetch(API_BASE_URL + '/tags/')

    if (!response.ok) {
        throw new Error(`Erreur HTTP! Status: ${response.status}`) 
    }

    const data = await response.json()

    return data  
}

export async function addNewTag(tagData) {
    
    const color = '#' + (Math.floor(Math.random()*16777215).toString(16)).padStart(6, '0')
    const response = await fetch(API_BASE_URL + '/tags/new_tag', { headers: { 'Content-Type': 'application/json' }, method: "POST", body: JSON.stringify({...tagData, by_default: false, color: color}) } )  

    if (!response.ok) {
        const promise = await response.json()
        const message = promise.detail
        throw new Error(` ${message}`) 
    }

    const data = await response.json()

    return data
}

export async function updateTag(tagId, tagData) {
    
    const response = await fetch(API_BASE_URL + `/tags/tag/${tagId}/update`, { headers: { 'Content-Type': 'application/json' }, method: "PATCH", body: JSON.stringify({...tagData}) } )  

    if (!response.ok) {
        throw new Error(`Erreur HTTP! Status: ${response.status}`) 
    }

    const data = await response.json()

    return data
}

export async function deleteTag(tagId) {
    
    const response = await fetch(API_BASE_URL + `/tags/tag/${tagId}/delete`, { headers: { 'Content-Type': 'application/json' }, method: "DELETE" } )  

    if (!response.ok) {
        throw new Error(`Erreur HTTP! Status: ${response.status}`) 
    }

    const data = await response.json()

    return data
}