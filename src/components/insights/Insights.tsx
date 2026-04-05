import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, PiggyBank, Target } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/Card';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatPercentage } from '../../utils/format';

export function Insights() {
  const { insights, categorySpending } = useApp();

  const insightCards = [
    {
      title: 'Highest Spending',
      value: insights.highestSpendingCategory,
      icon: Target,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      description: categorySpending[0] ? formatCurrency(categorySpending[0].amount) : 'N/A'
    },
    {
      title: 'Savings Rate',
      value: formatPercentage(insights.savingsRate),
      icon: PiggyBank,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      description: insights.savingsRate > 20 ? 'Excellent!' : insights.savingsRate > 10 ? 'Good' : 'Needs improvement'
    },
    {
      title: 'Average Transaction',
      value: formatCurrency(insights.averageTransaction),
      icon: DollarSign,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      description: 'Per transaction'
    },
    {
      title: 'Monthly Comparison',
      value: `${insights.monthlyComparison > 0 ? '+' : ''}${formatPercentage(insights.monthlyComparison)}`,
      icon: TrendingUp,
      color: insights.monthlyComparison > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400',
      bgColor: insights.monthlyComparison > 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20',
      description: 'vs last month'
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

  const getRecommendation = () => {
    if (insights.savingsRate < 10) {
      return {
        type: 'warning',
        title: 'Low Savings Rate',
        message: 'Consider reducing expenses in your highest spending category to improve your savings.',
        action: 'Review spending habits'
      };
    } else if (insights.savingsRate > 30) {
      return {
        type: 'success',
        title: 'Great Savings!',
        message: 'You\'re saving a healthy amount. Consider investing your surplus for better returns.',
        action: 'Explore investment options'
      };
    } else {
      return {
        type: 'info',
        title: 'Balanced Finances',
        message: 'Your savings rate is healthy. Keep maintaining your current spending patterns.',
        action: 'Stay on track'
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <div className="space-y-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {insightCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.title} variants={itemVariants}>
              <Card delay={index * 0.1}>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${card.bgColor}`}>
                      <Icon className={`w-6 h-6 ${card.color}`} />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {card.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {card.value}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {card.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <Card delay={0.6}>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`p-4 rounded-lg ${
              recommendation.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800' :
              recommendation.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' :
              'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  recommendation.type === 'warning' ? 'bg-yellow-200 dark:bg-yellow-800' :
                  recommendation.type === 'success' ? 'bg-green-200 dark:bg-green-800' :
                  'bg-blue-200 dark:bg-blue-800'
                }`}>
                  {recommendation.type === 'warning' ? (
                    <Target className="w-4 h-4 text-yellow-700 dark:text-yellow-300" />
                  ) : recommendation.type === 'success' ? (
                    <TrendingUp className="w-4 h-4 text-green-700 dark:text-green-300" />
                  ) : (
                    <DollarSign className="w-4 h-4 text-blue-700 dark:text-blue-300" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {recommendation.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {recommendation.message}
                  </p>
                  <button className={`text-sm font-medium ${
                    recommendation.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                    recommendation.type === 'success' ? 'text-green-600 dark:text-green-400' :
                    'text-blue-600 dark:text-blue-400'
                  } hover:underline`}>
                    {recommendation.action} →
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
