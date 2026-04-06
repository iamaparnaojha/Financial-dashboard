import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  CreditCard, 
  Target, 
  Settings, 
  ChevronRight,
  Zap,
  LogOut,
  Moon,
  Sun,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const { state, dispatch } = useApp();
  const { logout, user, isAuthenticated } = useAuth();

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'cards', label: 'Cards', icon: CreditCard },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const handleLogout = () => {
    logout();
    setActiveTab('overview');
  };

  return (
    <AnimatePresence>
      {(isOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />

          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed inset-y-0 left-0 w-72 lg:relative lg:translate-x-0 h-full flex flex-col glass-card border-l-0 border-t-0 border-b-0 rounded-none z-50 shadow-2xl lg:shadow-none transition-all duration-300`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                    <Zap size={24} fill="currentColor" />
                  </div>
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-white dark:to-gray-400">
                    Money Sphere
                  </span>
                </div>
                
                {/* Close button - mobile only */}
                <button 
                  onClick={onClose}
                  className="lg:hidden p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabClick(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                        isActive 
                          ? 'bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 shadow-[0_0_15px_-3px_rgba(99,102,241,0.2)] dark:shadow-[0_0_15px_-3px_rgba(99,102,241,0.3)]' 
                          : 'text-gray-500 dark:text-gray-400 hover:bg-indigo-500/5 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={20} className={isActive ? 'text-indigo-600 dark:text-indigo-400' : 'group-hover:text-indigo-600 dark:group-hover:text-white transition-colors'} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {isActive && <ChevronRight size={16} />}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="mt-auto p-6 space-y-4">
              {/* Upgrade Plan Card */}
              <div className="p-4 rounded-2xl bg-indigo-500/5 dark:bg-gradient-to-br dark:from-indigo-600/20 dark:via-purple-600/20 dark:to-pink-600/20 border border-indigo-500/10 dark:border-indigo-500/20 group hover:border-indigo-500/30 dark:hover:border-indigo-500/40 transition-all cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                    <Zap size={16} />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Pro Plan</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">Unlock analytics and multi-card sync.</p>
                <button className="w-full py-2 px-4 rounded-xl bg-indigo-600 dark:bg-white text-white dark:text-gray-900 text-xs font-bold hover:bg-indigo-700 dark:hover:bg-gray-200 transition-colors shadow-md shadow-indigo-500/20">
                  Upgrade
                </button>
              </div>

              {/* Theme Toggle & User */}
              <div className="pt-4 border-t border-gray-100 dark:border-white/5 space-y-4">
                <button 
                  onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
                  className="w-full flex items-center gap-3 px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
                >
                  {state.darkMode ? <Sun size={20} /> : <Moon size={20} />}
                  <span className="text-sm font-medium">{state.darkMode ? 'Light' : 'Dark'}</span>
                </button>

                {isAuthenticated ? (
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-lg shadow-indigo-500/20">
                        {user?.username?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.username}</p>
                        <p className="text-[10px] text-gray-500 truncate capitalize">{user?.role}</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="p-1.5 text-gray-500 hover:text-red-400 transition-colors shrink-0"
                      title="Logout"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 text-center italic px-4">Log in for full access</p>
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
