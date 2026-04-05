import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Transaction } from '../../types';
import { categories } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

interface TransactionFormProps {
  transaction?: Transaction | null;
  onClose: () => void;
}

export function TransactionForm({ transaction, onClose }: TransactionFormProps) {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense' as 'income' | 'expense',
    category: 'Other',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        amount: transaction.amount.toString(),
        type: transaction.type,
        category: transaction.category,
        date: transaction.date,
        description: transaction.description
      });
    }
  }, [transaction]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.description) {
      return;
    }

    const transactionData: Transaction = {
      id: transaction?.id || Date.now().toString(),
      amount: parseFloat(formData.amount),
      type: formData.type,
      category: formData.category,
      date: formData.date,
      description: formData.description
    };

    if (transaction) {
      dispatch({ 
        type: 'UPDATE_TRANSACTION', 
        payload: { id: transaction.id, transaction: transactionData } 
      });
    } else {
      dispatch({ type: 'ADD_TRANSACTION', payload: transactionData });
    }

    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const filteredCategories = categories.filter(cat => {
    if (formData.type === 'income') {
      return ['Salary', 'Freelance', 'Investment', 'Other'].includes(cat);
    }
    return !['Salary', 'Freelance', 'Investment'].includes(cat);
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Amount ($)
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={formData.amount}
          onChange={(e) => handleInputChange('amount', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="0.00"
          required
        />
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleInputChange('type', 'income')}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all
              ${formData.type === 'income' 
                ? 'bg-green-600 text-white shadow-lg' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }
            `}
          >
            Income
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleInputChange('type', 'expense')}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all
              ${formData.type === 'expense' 
                ? 'bg-red-600 text-white shadow-lg' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }
            `}
          >
            Expense
          </motion.button>
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Category
        </label>
        <select
          value={formData.category}
          onChange={(e) => handleInputChange('category', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {filteredCategories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Date
        </label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => handleInputChange('date', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter description..."
          required
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
        >
          {transaction ? 'Update' : 'Add'} Transaction
        </motion.button>
      </div>
    </form>
  );
}
