import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowUpDown, Plus, Edit2, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/Card';
import { Modal } from '../ui/Modal';
import { TransactionForm } from './TransactionForm';
import { useApp } from '../../context/AppContext';
import { Transaction } from '../../types';
import { formatCurrency, formatDate } from '../../utils/format';
import { cn } from '../../utils/cn';

export function TransactionList() {
  const { state, dispatch, filteredTransactions } = useApp();
  const [searchTerm, setSearchTerm] = useState(state.filters.search);
  const [showFilters, setShowFilters] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    dispatch({ type: 'SET_FILTERS', payload: { search: value } });
  };

  const handleFilter = (filterType: string, value: string) => {
    dispatch({ type: 'SET_FILTERS', payload: { [filterType]: value } });
  };

  const handleSort = (sortBy: 'date' | 'amount' | 'category') => {
    const newOrder = state.sortBy === sortBy && state.sortOrder === 'desc' ? 'asc' : 'desc';
    dispatch({ type: 'SET_SORT', payload: { sortBy, sortOrder: newOrder } });
  };

  const handleDeleteTransaction = (id: string) => {
    if (state.userRole === 'admin') {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }
  };

  const handleAddTransaction = () => {
    if (state.userRole === 'admin') {
      setShowAddModal(true);
    }
  };

  const handleEditTransaction = (transaction: Transaction) => {
    if (state.userRole === 'admin') {
      setEditingTransaction(transaction);
    }
  };

  const categories = Array.from(new Set(filteredTransactions.map(t => t.category)));

  return (
    <>
      <Card delay={0.5}>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Transactions</CardTitle>
            {state.userRole === 'admin' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddTransaction}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Add Transaction
              </motion.button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-wrap gap-2"
                  >
                    <select
                      value={state.filters.type}
                      onChange={(e) => handleFilter('type', e.target.value)}
                      className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Types</option>
                      <option value="income">Income</option>
                      <option value="expense">Expenses</option>
                    </select>

                    <select
                      value={state.filters.category}
                      onChange={(e) => handleFilter('category', e.target.value)}
                      className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sort buttons */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => handleSort('date')}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 border rounded-lg transition-colors",
                state.sortBy === 'date' 
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
            >
              Date
              <ArrowUpDown className="w-3 h-3" />
            </button>
            <button
              onClick={() => handleSort('amount')}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 border rounded-lg transition-colors",
                state.sortBy === 'amount' 
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
            >
              Amount
              <ArrowUpDown className="w-3 h-3" />
            </button>
            <button
              onClick={() => handleSort('category')}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 border rounded-lg transition-colors",
                state.sortBy === 'category' 
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
            >
              Category
              <ArrowUpDown className="w-3 h-3" />
            </button>
          </div>

          {/* Transaction List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {filteredTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 hover:shadow-md group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-full",
                      transaction.type === 'income' 
                        ? "bg-green-100 dark:bg-green-900/20" 
                        : "bg-red-100 dark:bg-red-900/20"
                    )}>
                      {transaction.type === 'income' ? (
                        <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(transaction.date)} • {transaction.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "font-semibold",
                      transaction.type === 'income' 
                        ? "text-green-600 dark:text-green-400" 
                        : "text-red-600 dark:text-red-400"
                    )}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </span>
                    {state.userRole === 'admin' && (
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEditTransaction(transaction)}
                          className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteTransaction(transaction.id)}
                          className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredTransactions.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No transactions found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm || state.filters.category !== 'all' || state.filters.type !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Start by adding your first transaction'
                }
              </p>
              {state.userRole === 'admin' && !searchTerm && state.filters.category === 'all' && state.filters.type === 'all' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddTransaction}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Transaction
                </motion.button>
              )}
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Add Transaction Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Transaction"
      >
        <TransactionForm
          onClose={() => setShowAddModal(false)}
        />
      </Modal>

      {/* Edit Transaction Modal */}
      <Modal
        isOpen={!!editingTransaction}
        onClose={() => setEditingTransaction(null)}
        title="Edit Transaction"
      >
        <TransactionForm
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
        />
      </Modal>
    </>
  );
}
