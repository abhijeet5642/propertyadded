import api from './axiosConfig';

/**
 * Fetch all users (Admin only)
 * @returns {Promise<Array>} A list of user objects
 */
export async function getUsers() {
  try {
    const { data } = await api.get('/users');
    return data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
}

/**
 * Delete a user by their ID (Admin only)
 * @param {string} userId The ID of the user to delete
 * @returns {Promise<Object>} Success message
 */
export async function deleteUser(userId) {
  try {
    const { data } = await api.delete(`/users/${userId}`);
    return data;
  } catch (error) {
    console.error(`Failed to delete user ${userId}:`, error);
    throw error;
  }
}
