// import api from './axiosConfig';
import api from './apiClient'; // Import the configured axios instance

const LS_KEY = 'userInfo';

/**
 * Get the currently logged-in user data from localStorage.
 */
export function getCurrentUser() {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return null;

  try {
    // The raw data should contain the user object and token
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse user data from localStorage", e);
    return null;
  }
}

/**
 * Register a new user.
 * @param {{ fullName: string, email: string, password: string, phoneNumber: string }} userData
 */
export async function register(userData) {
  // The API call doesn't return the user, just a success message.
  // We don't log the user in or store anything on registration.
  const response = await api.post('/auth/register', userData);
  return response.data;
}

/**
 * Verify the user's OTP.
 * @param {{ email: string, otp: string }} otpData
 */
export async function verifyOtp(otpData) {
  const response = await api.post('/auth/verify-otp', otpData);
  return response.data;
}

/**
 * Log in with email and password.
 * @param {{ email: string, password: string }} credentials
 */
export async function login(credentials) {
  const { data } = await api.post('/auth/login', credentials);

  // On successful login, the backend returns the user object and token.
  // We store this entire object in localStorage.
  if (data && data.token) {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } else {
    // If login fails or doesn't return a token, ensure localStorage is clean.
    localStorage.removeItem(LS_KEY);
  }

  return data;
}

/**
 * Log out by clearing localStorage.
 */
export function logout() {
  localStorage.removeItem(LS_KEY);
}
   
// --- Forgot Password ---
// Sends the user's email to the backend to request a password reset link.
export const forgotPassword = async (emailData) => {
  const { data } = await apiClient.post('/auth/forgot-password', emailData);
  return data;
};

// --- Reset Password ---
// Sends the reset token and the new password to the backend.
export const resetPassword = async (token, passwordData) => {
  const { data } = await apiClient.post(`/auth/reset-password/${token}`, passwordData);
  return data;
};