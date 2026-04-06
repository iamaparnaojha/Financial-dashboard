import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Download, LogOut, User, Edit3, Eye, UserPlus, Menu } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { ThreeLogo } from '../ui/ThreeLogo';
import { AuthModal } from '../auth/AuthModal';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { state, dispatch } = useApp();
  const { user, isAuthenticated, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin');

  const handleDarkModeToggle = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  const handleExport = () => {
    const data = {
      transactions: state.transactions,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finance-dashboard-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openSignIn = () => {
    setAuthModalTab('signin');
    setShowAuthModal(true);
  };

  const openSignUp = () => {
    setAuthModalTab('signup');
    setShowAuthModal(true);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 dark:bg-[#1E293B]/40 backdrop-blur-2xl border-b border-white/20 dark:border-white/10 px-4 sm:px-6 py-4 sticky top-0 z-30 shadow-lg"
      >
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Left: Menu Toggle (Mobile) + Logo + Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button 
              onClick={onMenuClick}
              className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
            <ThreeLogo className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" />
            <h1 className="text-lg sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 truncate max-w-[120px] sm:max-w-none">
              Money Sphere
            </h1>

            {/* Role badge */}
            <AnimatePresence>
              {isAuthenticated && user && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold flex-shrink-0 ${
                    user.role === 'admin'
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 border-blue-400/50 text-white'
                      : 'bg-gradient-to-r from-purple-500 to-violet-500 border-purple-400/50 text-white'
                  }`}
                >
                  {user.role === 'admin' ? <Edit3 className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span className="capitalize">{user.role}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Export */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              className="flex items-center gap-2 px-2.5 sm:px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all shadow-md text-sm"
              title="Export data"
            >
              <Download className="w-4 h-4" />
              <span className="hidden lg:inline font-medium">Export</span>
            </motion.button>

            {/* Dark mode toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDarkModeToggle}
              className={`flex items-center gap-2 px-2.5 sm:px-4 py-2 rounded-lg transition-all shadow-md text-sm ${
                state.darkMode
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                  : 'bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold'
              }`}
            >
              {state.darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="hidden lg:inline font-medium">{state.darkMode ? 'Light' : 'Dark'}</span>
            </motion.button>

            {/* ── Auth section ── */}
            <AnimatePresence mode="wait">
              {isAuthenticated && user ? (
                <motion.div
                  key="user-actions"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-1.5 sm:gap-2"
                >
                  {/* User Avatar */}
                  <div className="flex items-center gap-2 px-2 sm:px-3 py-2 bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200/40 dark:border-blue-700/30 rounded-xl">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <User className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 hidden md:inline max-w-[100px] truncate">
                      {user.username}
                    </span>
                  </div>

                  {/* Logout */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={logout}
                    title="Sign out"
                    className="flex items-center gap-2 px-2.5 sm:px-4 py-2 bg-red-500/10 hover:bg-red-500/20 dark:bg-red-500/20 dark:hover:bg-red-500/30 text-red-600 dark:text-red-400 rounded-lg transition-all border border-red-500/30 text-sm font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden lg:inline">Logout</span>
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="auth-cta"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-1.5 sm:gap-2"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openSignIn}
                    className="px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                  >
                    <User className="w-4 h-4 inline sm:mr-2" />
                    <span className="hidden sm:inline">Sign In</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openSignUp}
                    className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md text-sm font-semibold"
                  >
                    <UserPlus className="w-4 h-4 inline sm:mr-2" />
                    <span className="hidden sm:inline">Join</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab={authModalTab}
      />
    </>
  );
}
