import React, { useState } from 'react';
import { Plus, Trash2, CreditCard, Calendar, ShieldCheck, Wallet } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export const CardsView: React.FC = () => {
  const { state, addCard, deleteCard } = useApp();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCard, setNewCard] = useState<Omit<Card, 'id'>>({
    nickname: '',
    type: 'visa',
    last4: '',
    expiry: '',
    balance: 0,
    color: 'blue'
  });

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCard.last4.length !== 4) return;
    await addCard(newCard);
    setIsModalOpen(false);
    setNewCard({
      nickname: '',
      type: 'visa',
      last4: '',
      expiry: '',
      balance: 0,
      color: 'blue'
    });
  };

  const getCardGradient = (color: string) => {
    switch (color) {
      case 'blue': return 'from-blue-600 to-indigo-700';
      case 'purple': return 'from-purple-600 to-indigo-800';
      case 'emerald': return 'from-emerald-600 to-teal-800';
      case 'rose': return 'from-rose-600 to-pink-800';
      case 'amber': return 'from-amber-500 to-orange-700';
      default: return 'from-gray-700 to-gray-900';
    }
  };

  return (
    <div className="space-y-8 p-1">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Cards</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your connected accounts and cards.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
        >
          <Plus size={20} />
          Add New Card
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence>
          {state.cards.map((card) => (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`relative h-56 rounded-[2rem] p-8 text-white overflow-hidden shadow-2xl group transition-all duration-500 hover:-translate-y-2`}
            >
              {/* Card Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${getCardGradient(card.color)} opacity-90`} />
              
              {/* Glass Overlays */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
              <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-black/20 rounded-full blur-3xl" />

              {/* Card Content */}
              <div className="relative h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-1">Nickname</p>
                    <h3 className="text-xl font-bold truncate max-w-[180px]">{card.nickname}</h3>
                  </div>
                  <div className="text-white/80 italic font-black text-2xl tracking-tighter">
                    {card.type.toUpperCase()}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-9 rounded-md bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-80 relative overflow-hidden shadow-inner">
                        <div className="absolute inset-0 grid grid-cols-3 gap-0.5 opacity-20">
                            {Array(12).fill(0).map((_, i) => <div key={i} className="border border-black" />)}
                        </div>
                    </div>
                    <p className="text-2xl font-mono tracking-[0.2em]">•••• •••• •••• {card.last4}</p>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white/60 text-[10px] uppercase tracking-widest mb-1">Balance</p>
                      <p className="text-2xl font-bold">${card.balance.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-[10px] uppercase tracking-widest mb-1">Expiry</p>
                      <p className="text-sm font-semibold">{card.expiry}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons overlay on hover */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                   onClick={() => deleteCard(card.id)}
                   className="p-2 rounded-full bg-black/20 hover:bg-red-500/40 text-white/80 hover:text-white transition-all backdrop-blur-md"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State / Add Card Placeholder */}
        {state.cards.length === 0 && (
          <div 
            onClick={() => setIsModalOpen(true)}
            className="h-56 rounded-[2rem] border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 hover:text-indigo-500 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all cursor-pointer group"
          >
            <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800/50 group-hover:bg-indigo-500/10 mb-4 transition-all">
              <Plus size={32} />
            </div>
            <p className="font-semibold">Add your first card</p>
          </div>
        )}
      </div>

      {/* Add Card Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md glass-card p-8 shadow-2xl border-white/20 dark:border-white/10"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <CreditCard className="text-indigo-600 dark:text-indigo-400" />
                Add New Card
              </h2>

              <form onSubmit={handleAddCard} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Card Nickname</label>
                  <input
                    required
                    type="text"
                    value={newCard.nickname}
                    onChange={e => setNewCard({...newCard, nickname: e.target.value})}
                    placeholder="e.g. Main Savings"
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Card Type</label>
                    <select
                      value={newCard.type}
                      onChange={e => setNewCard({...newCard, type: e.target.value as any})}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none"
                    >
                      <option value="visa" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Visa</option>
                      <option value="mastercard" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Mastercard</option>
                      <option value="amex" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Amex</option>
                      <option value="other" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Last 4 Digits</label>
                    <input
                      required
                      maxLength={4}
                      type="text"
                      value={newCard.last4}
                      onChange={e => setNewCard({...newCard, last4: e.target.value.replace(/\D/g, '')})}
                      placeholder="1234"
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Expiry Date</label>
                    <input
                      required
                      type="text"
                      placeholder="MM/YY"
                      value={newCard.expiry}
                      onChange={e => setNewCard({...newCard, expiry: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Balance</label>
                    <input
                      required
                      type="number"
                      value={newCard.balance}
                      onChange={e => setNewCard({...newCard, balance: parseFloat(e.target.value)})}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Card Theme</label>
                  <div className="flex gap-3 mt-2">
                    {['blue', 'purple', 'emerald', 'rose', 'amber'].map(color => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setNewCard({...newCard, color})}
                          className={`w-10 h-10 rounded-full border-2 transition-all ${
                            newCard.color === color ? 'border-indigo-600 dark:border-white scale-110 shadow-lg' : 'border-transparent'
                          }`}
                          style={{ 
                              background: color === 'emerald' ? '#059669' : 
                                          color === 'rose' ? '#e11d48' : 
                                          color === 'amber' ? '#d97706' : 
                                          color === 'purple' ? '#9333ea' : '#2563eb' 
                          }}
                        />
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 px-4 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-white font-semibold transition-all border border-gray-200 dark:border-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all border border-indigo-500/50 shadow-lg shadow-indigo-500/20"
                  >
                    Create Card
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
