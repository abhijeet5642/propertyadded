import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout.jsx';
// Removed direct Header and Footer imports as they are likely in Layout.jsx
// import Header from './components/Header.jsx';
// import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Contact from './pages/Contact.jsx';
import Properties from './pages/Properties.jsx'; // Correctly imported Properties page component
import PropertyDetail from './pages/PropertyDetail.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import VerifyOtp from './pages/Auth/VerifyOtp.jsx';
import AdminLayout from './pages/Admin/AdminLayout.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';
import UserManagement from './pages/Admin/UserManagement.jsx';
import PropertyManagement from './pages/Admin/PropertyManagement.jsx';
import AdminRoute from './components/AdminRoute.jsx';

import './styles/styles.css';
import './index.css';

import { useAuthStore } from './store/useAuthStore.js';


function RequireAuth({ children }) {
  const user = useAuthStore((s) => s.user);
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="bg-midnight text-white min-h-screen"> {/* Apply the dark-blue background globally */}
      <Layout>
        {/* Removed Header and Footer here, as Layout.jsx typically renders them */}
        {/* <Header /> */}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/properties" element={<Properties />} />
          {/* CORRECTED LINE: Changed path from "/property/:id" to "/properties/:id" */}
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />

          

          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="properties" element={<PropertyManagement />} />
          </Route>
        </Routes>
        {/* <Footer /> */}
      </Layout>
    </div>
  );
}
