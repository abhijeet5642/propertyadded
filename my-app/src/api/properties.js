import apiClient from './apiClient.js'; // Import the new central client

// Get all properties
export const getProperties = async () => {
  const { data } = await apiClient.get('/properties');
  return data;
};

// Get a single property by its ID
export const getPropertyById = async (id) => {
  const { data } = await apiClient.get(`/properties/${id}`);
  return data;
};

// --- UPDATED FUNCTION ---
// Create a new property
export const createProperty = async (formData) => {
  // When you send a FormData object with Axios, it automatically sets
  // the correct 'Content-Type: multipart/form-data' header with the boundary.
  // Manually setting the header here would break the file upload.
  const { data } = await apiClient.post('/properties', formData);
  return data;
};

// Delete a property by its ID
export const deleteProperty = async (id) => {
  const { data } = await apiClient.delete(`/properties/${id}`);
  return data;
};

// (Optional) Update a property
export const updateProperty = async (id, propertyData) => {
  const { data } = await apiClient.put(`/properties/${id}`, propertyData);
  return data;
};
