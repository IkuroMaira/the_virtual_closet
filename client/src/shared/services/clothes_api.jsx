import { API_BASE_URL } from "./api.jsx";
const API_CLOTHES_URL = `${API_BASE_URL}/clothes`;

/**
 * Function to get all clothes with the backend
 * @returns {Promise} - Returns the backend datas
 */
export async function getAllClothes() {
  const response = await fetch(`${API_CLOTHES_URL}/`);

  if (!response.ok) {
    throw new Error(`Erreur HTTP! Status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

/**
 * Function to get one item with the backend
 * @returns {Promise} - Returns the backend datas
 */
export async function getItem(item_id) {
  const response = await fetch(`${API_CLOTHES_URL}/item/${item_id}`);

  if (!response.ok) {
    throw new Error(`Erreur HTTP! Status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

/**
 * Function to create one item in the backend
 *
 */
export async function createClothing(clothing) {
  const response = await fetch(`${API_CLOTHES_URL}/new_clothing`, {
    method: "POST", // On indique au fetch d'utiliser la méthode POST - c'est ce que la route FastAPI attend (@router.post)
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clothing),
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP! Status: ${response.status}`);
  }
}

export async function getAllEnums() {
  const response = await fetch(`${API_CLOTHES_URL}/enums`);

  if (!response.ok) {
    throw new Error(`Erreur HTTP! Status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

export async function deleteClothing(item_id) {
  const response = await fetch(`${API_CLOTHES_URL}/item/${item_id}/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP! Status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

/**
 * Function to update one item in the backend
 */
export async function updateClothing(clothing) {
  const response = await fetch(`${API_CLOTHES_URL}/item/${clothing.id}/update`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clothing),
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP! Status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}
