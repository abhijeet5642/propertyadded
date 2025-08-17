import React from 'react';
import { Navigate } from 'react-router-dom';
// The import for useAuthStore has been commented out because the file path could not be resolved.
// Please ensure the path is correct for your project structure and uncomment it.
// import { useAuthStore } from '../store/useAuthStore';

const AdminRoute = ({ children }) => {
  // The line below is commented out to prevent the app from crashing due to the unresolved import.
  // You will need to fix the import path above and uncomment this line.
  // const user = useAuthStore((state) => state.user);

  // --- MOCK USER DATA FOR DEMONSTRATION ---
  // This is a placeholder to allow the component's logic to be demonstrated.
  // Replace this with the actual user from your store once the import is fixed.
  const user = { role: 'admin' }; // Example: Try changing 'admin' to 'user' to see the redirect.

  // First, check if the user is logged in.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Next, check if the user has the 'admin' role.
  if (user.role !== 'admin') {
    // If they are logged in but not an admin, redirect to the homepage.
    return <Navigate to="/" replace />;
  }

  // If all checks pass, render the child components.
  return children;
};

export default AdminRoute;
