import { create } from 'zustand';
import * as authAPI from '../api/auth.js';

export const useAuthStore = create((set) => ({
  // Initialize user from localStorage. The user object now includes the token.
  user: authAPI.getCurrentUser(),

  // Register a new user
  register: async (userData) => {
    // This API call just returns a success message, doesn't log the user in.
    return await authAPI.register(userData);
  },

  // Verify the OTP for a given email
  verifyOtp: async (otpData) => {
    // Also returns a success message, doesn't log in.
    return await authAPI.verifyOtp(otpData);
  },

  // Log in with email and password
  login: async (creds) => {
    // The authAPI.login function handles storing the user data in localStorage
    const user = await authAPI.login(creds);
    // Update the state with the new user data (which includes the token)
    set({ user });
    return user;
  },

  // Log out the user
  logout: () => {
    authAPI.logout();
    set({ user: null });
  },
}));
