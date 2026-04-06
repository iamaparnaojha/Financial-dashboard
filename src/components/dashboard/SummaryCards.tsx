import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { useApp } from '../../context/AppContext';
import { AnimatedCounter } from '../ui/AnimatedCounter';

export function SummaryCards() {
  const { financialSummary } = useApp();

  const cards = [
    {
      title: 'Total Balance',
      value: financialSummary.totalBalance,
      icon: Wallet,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'bg-blue-500/10 border border-blue-500/20',
      trend: financialSummary.totalBalance >= 0 ? 'positive' : 'negative',
      trendValue: Math.abs(financialSummary.totalBalance)
    },
    {
      title: 'Total Income',
      value: financialSummary.totalIncome,
      icon: TrendingUp,
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'bg-green-500/10 border border-green-500/20',
      trend: 'positive',
      trendValue: financialSummary.totalIncome
    },
    {
      title: 'Total Expenses',
      value: financialSummary.totalExpenses,
      icon: TrendingDown,
      gradient: 'from-red-500 to-red-600',
      bgGradient: 'bg-red-500/10 border border-red-500/20',
      trend: 'negative',
      trendValue: financialSummary.totalExpenses
    },
    {
      title: 'Monthly Net',
      value: financialSummary.monthlyIncome - financialSummary.monthlyExpenses,
      icon: DollarSign,
      gradient: financialSummary.monthlyIncome >= financialSummary.monthlyExpenses 
        ? 'from-purple-500 to-purple-600' 
        : 'from-orange-500 to-orange-600',
      bgGradient: financialSummary.monthlyIncome >= financialSummary.monthlyExpenses 
        ? 'bg-purple-500/10 border border-purple-500/20' 
        : 'bg-orange-500/10 border border-orange-500/20',
      trend: financialSummary.monthlyIncome >= financialSummary.monthlyExpenses ? 'positive' : 'negative',
      trendValue: Math.abs(financialSummary.monthlyIncome - financialSummary.monthlyExpenses)
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div key={card.title} variants={itemVariants}>
            <Card delay={index * 0.1}>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`p-3 rounded-xl bg-gradient-to-br ${card.bgGradient} shadow-lg`}
                  >
                    <Icon className={`w-6 h-6 text-gradient-to-r ${card.gradient}`} />
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-full ${
                      card.trend === 'positive' 
                        ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' 
                        : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                    }`}
                  >
                    {card.trend === 'positive' ? (
                      <ArrowUp className="w-3 h-3" />
                    ) : (
                      <ArrowDown className="w-3 h-3" />
                    )}
                  </motion.div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {card.title}
                  </p>
                  <motion.p 
                    whileHover={{ scale: 1.02 }}
                    className="text-2xl font-bold text-gray-900 dark:text-white"
                  >
                    <AnimatedCounter value={card.value} prefix="$" />
                  </motion.p>
                  {card.trendValue > 0 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {card.trend === 'positive' ? '+' : '-'}<AnimatedCounter value={card.trendValue} prefix="$" /> from last month
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
