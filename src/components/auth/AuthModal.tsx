import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, Eye, EyeOff, UserPlus, LogIn, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'signin' | 'signup';
}

export function AuthModal({ isOpen, onClose, defaultTab = 'signin' }: AuthModalProps) {
  const { signIn, signUp } = useAuth();
  const [tab, setTab] = useState<'signin' | 'signup'>(defaultTab);

  // Sign In state
  const [siUsername, setSiUsername] = useState('');
  const [siPassword, setSiPassword] = useState('');
  const [siShowPassword, setSiShowPassword] = useState(false);

  // Sign Up state
  const [suUsername, setSuUsername] = useState('');
  const [suAdminPassword, setSuAdminPassword] = useState('');
  const [suViewerPassword, setSuViewerPassword] = useState('');
  const [suShowAdmin, setSuShowAdmin] = useState(false);
  const [suShowViewer, setSuShowViewer] = useState(false);

  // Shared state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Reset on open/tab change
  useEffect(() => {
    if (isOpen) {
      setTab(defaultTab);
      setError('');
      setSuccess('');
      setSiUsername(''); setSiPassword('');
      setSuUsername(''); setSuAdminPassword(''); setSuViewerPassword('');
    }
  }, [isOpen, defaultTab]);

  useEffect(() => {
    setError('');
    setSuccess('');
  }, [tab]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!siUsername.trim() || !siPassword) return;
    setIsLoading(true);
    setError('');
    try {
      await signIn(siUsername.trim(), siPassword);
      setSuccess('Signed in successfully!');
      setTimeout(() => onClose(), 800);
    } catch (err: any) {
      setError(err.message || 'Sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suUsername.trim() || !suAdminPassword || !suViewerPassword) return;
    setIsLoading(true);
    setError('');
    try {
      await signUp(suUsername.trim(), suAdminPassword, suViewerPassword);
      setSuccess('Account created! Signing you in...');
      setTimeout(() => onClose(), 800);
    } catch (err: any) {
      setError(err.message || 'Sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-md">
              {/* Card */}
              <div className="relative glass-card overflow-hidden">
                {/* Top gradient bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

                {/* Header */}
                <div className="px-8 pt-8 pb-6 bg-white/40 dark:bg-[#1E293B]/20 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Finance Dashboard</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Secure access</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Tab switcher */}
                  <div className="relative flex bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
                    <motion.div
                      layoutId="auth-tab-bg"
                      className="absolute inset-y-1 rounded-xl bg-white dark:bg-gray-700 shadow-sm"
                      style={{ width: 'calc(50% - 2px)', left: tab === 'signin' ? '4px' : 'calc(50% + 0px)' }}
                      transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                    />
                    <button
                      onClick={() => setTab('signin')}
                      className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl transition-colors duration-200 z-10 ${
                        tab === 'signin'
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </button>
                    <button
                      onClick={() => setTab('signup')}
                      className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl transition-colors duration-200 z-10 ${
                        tab === 'signup'
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      <UserPlus className="w-4 h-4" />
                      Create Account
                    </button>
                  </div>
                </div>

                {/* Form area */}
                <div className="px-8 pb-8">
                  {/* Error / Success banners */}
                  <AnimatePresence mode="wait">
                    {error && (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-start gap-3 p-4 mb-5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-2xl"
                      >
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                      </motion.div>
                    )}
                    {success && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-start gap-3 p-4 mb-5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-2xl"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-green-700 dark:text-green-400">{success}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    {/* ── SIGN IN FORM ── */}
                    {tab === 'signin' && (
                      <motion.form
                        key="signin"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        onSubmit={handleSignIn}
                        className="space-y-4"
                      >
                        {/* Username */}
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Username</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              value={siUsername}
                              onChange={e => setSiUsername(e.target.value)}
                              placeholder="Enter your username"
                              required
                              autoFocus
                              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                            />
                          </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type={siShowPassword ? 'text' : 'password'}
                              value={siPassword}
                              onChange={e => setSiPassword(e.target.value)}
                              placeholder="Enter admin or viewer password"
                              required
                              className="w-full pl-11 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                            />
                            <button type="button" onClick={() => setSiShowPassword(p => !p)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                              {siShowPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Use admin password for full access, viewer password for read-only
                          </p>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          disabled={isLoading || !siUsername.trim() || !siPassword}
                          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {isLoading ? (
                            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in...</>
                          ) : (
                            <><LogIn className="w-4 h-4" />Sign In</>
                          )}
                        </motion.button>
                      </motion.form>
                    )}

                    {/* ── SIGN UP FORM ── */}
                    {tab === 'signup' && (
                      <motion.form
                        key="signup"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        onSubmit={handleSignUp}
                        className="space-y-4"
                      >
                        {/* Username */}
                        <div className="space-y-1.5">
                          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Username</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              value={suUsername}
                              onChange={e => setSuUsername(e.target.value)}
                              placeholder="Choose a username (min 3 chars)"
                              required
                              autoFocus
                              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                            />
                          </div>
                        </div>

                        {/* Admin Password */}
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Admin Password</label>
                            <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full font-medium">Full access</span>
                          </div>
                          <div className="relative">
                            <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                            <input
                              type={suShowAdmin ? 'text' : 'password'}
                              value={suAdminPassword}
                              onChange={e => setSuAdminPassword(e.target.value)}
                              placeholder="Min 6 characters"
                              required
                              className="w-full pl-11 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                            />
                            <button type="button" onClick={() => setSuShowAdmin(p => !p)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                              {suShowAdmin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Viewer Password */}
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Viewer Password</label>
                            <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full font-medium">Read only</span>
                          </div>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                            <input
                              type={suShowViewer ? 'text' : 'password'}
                              value={suViewerPassword}
                              onChange={e => setSuViewerPassword(e.target.value)}
                              placeholder="Min 6 characters (must differ from admin)"
                              required
                              className="w-full pl-11 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                            />
                            <button type="button" onClick={() => setSuShowViewer(p => !p)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                              {suShowViewer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Info box */}
                        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl">
                          <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                            <strong>Tip:</strong> Share your viewer password with others to let them view your data without making changes. Keep your admin password private!
                          </p>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          disabled={isLoading || !suUsername.trim() || !suAdminPassword || !suViewerPassword}
                          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {isLoading ? (
                            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating account...</>
                          ) : (
                            <><UserPlus className="w-4 h-4" />Create Account</>
                          )}
                        </motion.button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
