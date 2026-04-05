import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { mockTransactions } from './data/mockData';
import { Header } from './components/layout/Header';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { BalanceTrendChart, CategorySpendingChart, MonthlyComparisonChart } from './components/dashboard/Charts';
import { TransactionList } from './components/transactions/TransactionList';
import { ObservationCard } from './components/dashboard/ObservationCard';
import { TransactionAnimationOverlay } from './components/ui/TransactionAnimationOverlay';

function DashboardContent() {
  const { dispatch } = useApp();

  useEffect(() => {
    dispatch({ type: 'SET_TRANSACTIONS', payload: mockTransactions });
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 relative">
      <TransactionAnimationOverlay />
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Summary Cards */}
          <SummaryCards />
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BalanceTrendChart />
            <CategorySpendingChart />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TransactionList />
            </div>
            <div className="space-y-6">
              <MonthlyComparisonChart />
              <ObservationCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}

export default App;
