import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, User, Download, Eye, Edit3 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ThreeLogo } from '../ui/ThreeLogo';

export function Header() {
  const { state, dispatch } = useApp();

  const handleRoleChange = (role: 'viewer' | 'admin') => {
    dispatch({ type: 'SET_USER_ROLE', payload: role });
  };

  const handleDarkModeToggle = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  const handleExport = () => {
    const data = {
      transactions: state.transactions,
      userRole: state.userRole,
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

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 px-6 py-4 sticky top-0 z-50 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ThreeLogo className="w-12 h-12" />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Finance Dashboard
          </h1>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
              state.userRole === 'admin' 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 border-blue-400 shadow-lg' 
                : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600'
            }`}
          >
            {state.userRole === 'admin' ? (
              <Edit3 className="w-4 h-4 text-white" />
            ) : (
              <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            )}
            <span className={`text-sm font-semibold capitalize ${
              state.userRole === 'admin' 
                ? 'text-white' 
                : 'text-gray-700 dark:text-gray-300'
            }`}>
              {state.userRole}
            </span>
          </motion.div>
        </div>

        <div className="flex items-center gap-3">
          {/* Role Switcher */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Role:</label>
            <select
              value={state.userRole}
              onChange={(e) => handleRoleChange(e.target.value as 'viewer' | 'admin')}
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Export Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all shadow-md"
            title="Export data"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export</span>
          </motion.button>

          {/* Dark Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDarkModeToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all shadow-md ${
              state.darkMode 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600' 
                : 'bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-800 hover:to-gray-900'
            }`}
          >
            {state.darkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">
              {state.darkMode ? 'Light' : 'Dark'}
            </span>
          </motion.button>

          {/* User Avatar */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-md"
          >
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">User</span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
