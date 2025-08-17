import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';
import { motion } from 'framer-motion';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  // Premium base styles
  const btnBase =
    'px-6 py-2.5 text-lg rounded-full font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md';
  const navIdle =
    'text-gray-700 hover:text-orange-500 hover:drop-shadow-[0_0_8px_rgba(255,100,0,0.4)]';
  const navActive =
    'text-orange-600 border-b-4 border-orange-600 pb-1.5 font-extrabold drop-shadow-[0_0_6px_rgba(255,100,0,0.6)]';
  const authBtn =
    'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 shadow-lg hover:shadow-orange-500/50';

  const navLinks = [
    { to: '/', label: 'Home', exact: true },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/properties', 'label': 'Properties' },
    { to: '/contact', label: 'Contact' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-white shadow-md border-b border-gray-200">
      <Link to="/" className="flex items-center gap-5">
        <motion.img
          src="/images/logo.jpg"
          alt="PNBW Official Logo"
          className="w-16 h-16 rounded-full object-cover border-4 border-orange-500 shadow-[0_0_15px_rgba(255,100,0,0.4)]"
          initial={{ rotate: 0, scale: 1 }}
          whileHover={{ rotate: 12, scale: 1.12 }}
          transition={{ type: 'spring', stiffness: 280, damping: 18 }}
        />
        <motion.h1
          className="header-title text-4xl font-extrabold tracking-wide"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
        >
          <span
            // Added text-stroke for contrast on a light background
            className="bg-gradient-to-t from-[#000000] via-[#ff4d4d] to-[#ff3b3b] bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(0,0,0,0.25)] text-stroke"
          >
            PixieNest BuildWell
          </span>
        </motion.h1>
      </Link>

      <div className="flex items-center gap-10">
        <nav className="flex gap-7">
          {navLinks.map(({ to, label, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className={({ isActive }) =>
                `${btnBase} ${isActive ? navActive : navIdle}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {user ? (
          <motion.button
            onClick={handleLogout}
            className={`${btnBase} ${authBtn}`}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            Logout
          </motion.button>
        ) : (
          <Link to="/login" className={`${btnBase} ${authBtn}`}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
}