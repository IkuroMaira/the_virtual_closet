import { supabase } from '@/shared/services/supabaseClient'

export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export async function getAuthHeaders() {
    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token
        ? { Authorization: `Bearer ${session.access_token}` }
        : {}
}

export async function testConnection() {
    const response = await fetch(API_BASE_URL + '/')

    if (!response.ok) {
        throw new Error(`Erreur HTTP! Status: ${response.status}`)
    }

    const data = await response.json()

    return data
}
