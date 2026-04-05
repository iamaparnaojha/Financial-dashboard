import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, Target, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatPercentage } from '../../utils/format';

export function ObservationCard() {
  const { insights, categorySpending } = useApp();

  const topCategory = categorySpending[0];
  const savingsRate = insights.savingsRate;
  const avgTransaction = insights.averageTransaction;

  return (
    <Card delay={0.6}>
      <CardContent>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"
            >
              <Target className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Quick Insights
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Key observations from your financial data
              </p>
            </div>
          </div>

          {/* Top Category */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Highest Spending
                </span>
              </div>
              {topCategory && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatPercentage(topCategory.percentage)}
                </span>
              )}
            </div>
            {topCategory ? (
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {topCategory.category}
                </span>
                <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {formatCurrency(topCategory.amount)}
                </span>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No spending data available
              </p>
            )}
          </div>

          {/* Savings Rate */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                Savings Rate
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatPercentage(savingsRate)}
              </span>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  savingsRate >= 20 
                    ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300' 
                    : savingsRate >= 10
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300'
                    : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300'
                }`}
              >
                {savingsRate >= 20 ? 'Excellent' : savingsRate >= 10 ? 'Good' : 'Needs Work'}
              </motion.div>
            </div>
          </div>

          {/* Average Transaction */}
          <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                Average Transaction
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Per transaction
                </span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatCurrency(avgTransaction)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Monthly estimate
                </span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  ~{formatCurrency(avgTransaction * 30)}
                </span>
              </div>
            </div>
          </div>

          {/* Alert */}
          {savingsRate < 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">
                    Spending Exceeds Income
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    Consider reviewing expenses to improve financial health
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
