export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

/**
 * Function to test the connection with the backend
 * @returns {Promise} - Returns the backend datas
 */
export async function testConnection() {
  const response = await fetch(API_BASE_URL + '/')

  if (!response.ok) {
    throw new Error(`Erreur HTTP! Status: ${response.status}`)
  }

  const data = await response.json()

  return data
}
