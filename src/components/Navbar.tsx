import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardPath = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'admin':
        return '/admin';
      case 'monitor':
        return '/monitor';
      case 'student':
        return '/student';
      default:
        return '/';
    }
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed w-full top-0 z-50 backdrop-blur-xl bg-white/30 border-b border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.05)]"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 relative flex items-center justify-center">

        {/* Center logo */}
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 group"
        >
          <img
            src="/assets/logo.png"
            alt="AssignPro Logo"
            className="w-16 h-auto drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
          />
        </Link>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-6">

          {/* Not logged in */}
          {!user && (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-300"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* Logged in */}
          {user && (
            <>
              <Link
                to={getDashboardPath()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 hover:bg-white/90 border border-white/50 backdrop-blur-sm transition-all shadow-sm"
              >
                <User className="h-4 w-4 text-purple-700" />
                <span className="text-gray-800 font-medium">{user.name}</span>
                <span className="text-xs bg-purple-200 text-purple-700 px-2 py-0.5 rounded-full uppercase">
                  {user.role}
                </span>
              </Link>

              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition-all"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
