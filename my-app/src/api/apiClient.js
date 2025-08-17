import axios from 'axios';

// Create a central Axios instance
const apiClient = axios.create({
  // Make sure this URL points to your backend server
  baseURL: 'http://localhost:5000/api', 
});

// --- IMPORTANT: Request Interceptor ---
// This function runs before every single request is sent.
// It retrieves the user's token from your authentication store (or localStorage)
// and adds it to the 'Authorization' header.
apiClient.interceptors.request.use(
  (config) => {
    // --- Replace this with your actual token management logic ---
    // Example: const token = useAuthStore.getState().token;
    const userInfo = localStorage.getItem('userInfo'); // Assuming you store user info here
    if (userInfo) {
      const token = JSON.parse(userInfo).token;
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    // -----------------------------------------------------------

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
