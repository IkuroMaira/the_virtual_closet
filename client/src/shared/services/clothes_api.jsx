import { API_BASE_URL, getAuthHeaders } from "./api.jsx";
import { supabase } from "./supabaseClient.js";
const API_CLOTHES_URL = `${API_BASE_URL}/clothes`;

const STORAGE_BUCKET = "clothes-pictures";

/**
 * Upload a picture to Supabase Storage and return its public URL.
 * @param {File} file
 * @param {string} userId - used to namespace files per user
 * @returns {Promise<string>} public URL
 */
export async function processClothingPicture(file) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(`${API_CLOTHES_URL}/process-picture`, {
    method: "POST",
    headers: { ...await getAuthHeaders() },
    body: formData,
  });
  if (!response.ok) throw new Error(`Erreur détourage : ${response.status}`);
  return response.blob();
}

export async function uploadClothingPicture(file, userId, extension = null) {
  const ext = extension ?? file.name.split(".").pop();
  const fileName = `${userId}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, file, { upsert: false });

  if (error) throw new Error(`Erreur upload : ${error.message}`);

  return fileName;
}

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
