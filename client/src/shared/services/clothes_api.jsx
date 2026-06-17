import { API_BASE_URL, getAuthHeaders } from "./api.jsx";
const API_CLOTHES_URL = `${API_BASE_URL}/clothes`;

/**
 * Function to get all clothes with the backend
 * @returns {Promise} - Returns the backend datas
 */
export async function getAllClothes() {
  const response = await fetch(`${API_CLOTHES_URL}/`, {
    headers: await getAuthHeaders(),
  });

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
  const response = await fetch(`${API_CLOTHES_URL}/item/${item_id}`, {
    headers: await getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP! Status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

/**
 * Function to create one item in the backend
 */
export async function createClothing(clothing) {
  const response = await fetch(`${API_CLOTHES_URL}/new_clothing`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...await getAuthHeaders() },
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
    headers: { "Content-Type": "application/json", ...await getAuthHeaders() },
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
    headers: { "Content-Type": "application/json", ...await getAuthHeaders() },
    body: JSON.stringify(clothing),
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP! Status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}
