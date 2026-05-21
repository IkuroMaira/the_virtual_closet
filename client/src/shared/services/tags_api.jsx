import { API_BASE_URL } from "./api.jsx"

export async function getAllTags() {

    try {
        const response = await fetch(API_BASE_URL + '/tags/')

        if (!response.ok) {
            throw new Error(`Erreur HTTP! Status: ${response.status}`) 
        }

        const data = await response.json()

        return data
        
    } catch (error) {
        throw error
    }
}

export async function addNewTag(tagData) {
    
    try {
        const response = await fetch(API_BASE_URL + '/tags/new_tag', { headers: { 'Content-Type': 'application/json' }, method: "POST", body: JSON.stringify({...tagData, by_default: false}) } )  

        if (!response.ok) {
            throw new Error(`Erreur HTTP! Status: ${response.status}`) 
        }

        const data = await response.json()

        return data

    } catch (error){
        throw error
    }
}

export async function updateTag(tagId, tagData) {
    
    try {
        const response = await fetch(API_BASE_URL + `/tags/{tagId}/update`, { headers: { 'Content-Type': 'application/json' }, method: "PATCH", body: JSON.stringify({...tagData}) } )  

        if (!response.ok) {
            throw new Error(`Erreur HTTP! Status: ${response.status}`) 
        }

        const data = await response.json()

        return data
        
    } catch (error){
        throw error
    }
}

export async function deleteTag(tagId) {
    
    try {
        const response = await fetch(API_BASE_URL + `/tags/{tagId}/delete`, { headers: { 'Content-Type': 'application/json' }, method: "DELETE" } )  

        if (!response.ok) {
            throw new Error(`Erreur HTTP! Status: ${response.status}`) 
        }

        const data = await response.json()

        return data
        
    } catch (error){
        throw error
    }
}