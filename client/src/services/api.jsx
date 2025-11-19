const API_BASE_URL = '/api'

/**
 * Function to test the connection with the backend
 * @returns {Promise} - Returns the backend datas
 */
export async function testConnection() {
  console.log('=> Appel : testConnection()')

  try {
    console.log('=> Envoi de la requête vers', API_BASE_URL + '/')
    const response = await fetch(API_BASE_URL + '/')

    if (!response.ok) {
      throw new Error(`Erreur HTTP! Status: ${response.status}`)
    }

    console.log('=> Réponse reçue:', response)

    const data = await response.json()
    console.log('=> Données:', data)

    return data

  } catch (error) {
    console.error('=> Erreur dans testConnection:', error)
    throw error
  }
}

export default async function Clothes() {
  console.log("=> Appel : Clothes")

  try {
    console.log('=> Envoi de la requête vers', API_BASE_URL + '/clothes')
    const response = await fetch(API_BASE_URL + '/clothes')

    if (!response.ok) {
      throw new Error(`Erreur HTTP! Status: ${response.status}`)
    }

    console.log('=> Réponse reçue:', response)

    const clothesData = await response.json()
    console.log('=> Données:', clothesData)

    return clothesData
  } catch (error) {
    console.error('=> Erreur dans testConnection:', error)
    throw error
  }
}
