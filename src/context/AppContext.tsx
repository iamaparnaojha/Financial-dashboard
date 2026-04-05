import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Transaction, UserRole, AppState, FinancialSummary, CategorySpending, BalanceTrend, Insights } from '../types';

type AppAction = 
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION'; payload: { id: string; transaction: Transaction } }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_USER_ROLE'; payload: UserRole }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'SET_FILTERS'; payload: Partial<AppState['filters']> }
  | { type: 'SET_SORT'; payload: { sortBy: AppState['sortBy']; sortOrder: AppState['sortOrder'] } }
  | { type: 'LOAD_STATE'; payload: Partial<AppState> };

const initialState: AppState = {
  transactions: [],
  userRole: 'viewer',
  darkMode: false,
  filters: {
    category: 'all',
    type: 'all',
    dateRange: 'all',
    search: ''
  },
  sortBy: 'date',
  sortOrder: 'desc'
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [...state.transactions, action.payload] };
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? action.payload.transaction : t
        )
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload)
      };
    case 'SET_USER_ROLE':
      return { ...state, userRole: action.payload };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload.sortBy, sortOrder: action.payload.sortOrder };
    case 'LOAD_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  financialSummary: FinancialSummary;
  categorySpending: CategorySpending[];
  balanceTrend: BalanceTrend[];
  insights: Insights;
  filteredTransactions: Transaction[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('finance-dashboard-state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', payload: parsed });
      } catch (error) {
        console.error('Failed to load state from localStorage:', error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('finance-dashboard-state', JSON.stringify(state));
  }, [state]);

  // Apply dark mode to document
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  // Calculate financial summary
  const financialSummary: FinancialSummary = React.useMemo(() => {
    const income = state.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = state.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyIncome = state.transactions
      .filter(t => t.type === 'income')
      .filter(t => {
        const date = new Date(t.date);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      })
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyExpenses = state.transactions
      .filter(t => t.type === 'expense')
      .filter(t => {
        const date = new Date(t.date);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      })
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalBalance: income - expenses,
      totalIncome: income,
      totalExpenses: expenses,
      monthlyIncome,
      monthlyExpenses
    };
  }, [state.transactions]);

  // Calculate category spending
  const categorySpending: CategorySpending[] = React.useMemo(() => {
    const expensesByCategory = state.transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    const totalExpenses = Object.values(expensesByCategory).reduce((sum, amount) => sum + amount, 0);

    return Object.entries(expensesByCategory).map(([category, amount]) => ({
      category,
      amount,
      percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0
    })).sort((a, b) => b.amount - a.amount);
  }, [state.transactions]);

  // Calculate balance trend
  const balanceTrend: BalanceTrend[] = React.useMemo(() => {
    const sortedTransactions = [...state.transactions].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const trend: BalanceTrend[] = [];
    let runningBalance = 0;

    sortedTransactions.forEach(transaction => {
      if (transaction.type === 'income') {
        runningBalance += transaction.amount;
      } else {
        runningBalance -= transaction.amount;
      }
      
      trend.push({
        date: transaction.date,
        balance: runningBalance
      });
    });

    return trend;
  }, [state.transactions]);

  // Calculate insights
  const insights: Insights = React.useMemo(() => {
    const highestSpending = categorySpending[0]?.category || 'N/A';
    
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    const lastMonthIncome = state.transactions
      .filter(t => t.type === 'income')
      .filter(t => new Date(t.date) >= lastMonth)
      .reduce((sum, t) => sum + t.amount, 0);

    const lastMonthExpenses = state.transactions
      .filter(t => t.type === 'expense')
      .filter(t => new Date(t.date) >= lastMonth)
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyComparison = financialSummary.monthlyIncome > 0 
      ? ((financialSummary.monthlyIncome - financialSummary.monthlyExpenses) / financialSummary.monthlyIncome) * 100
      : 0;

    const averageTransaction = state.transactions.length > 0
      ? state.transactions.reduce((sum, t) => sum + t.amount, 0) / state.transactions.length
      : 0;

    const savingsRate = financialSummary.totalIncome > 0
      ? ((financialSummary.totalIncome - financialSummary.totalExpenses) / financialSummary.totalIncome) * 100
      : 0;

    return {
      highestSpendingCategory: highestSpending,
      monthlyComparison,
      averageTransaction,
      savingsRate
    };
  }, [state.transactions, categorySpending, financialSummary]);

  // Filter and sort transactions
  const filteredTransactions: Transaction[] = React.useMemo(() => {
    let filtered = [...state.transactions];

    // Apply filters
    if (state.filters.category !== 'all') {
      filtered = filtered.filter(t => t.category === state.filters.category);
    }
    
    if (state.filters.type !== 'all') {
      filtered = filtered.filter(t => t.type === state.filters.type);
    }
    
    if (state.filters.search) {
      const searchLower = state.filters.search.toLowerCase();
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(searchLower) ||
        t.category.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (state.sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
      }
      
      return state.sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [state.transactions, state.filters, state.sortBy, state.sortOrder]);

  return (
    <AppContext.Provider value={{
      state,
      dispatch,
      financialSummary,
      categorySpending,
      balanceTrend,
      insights,
      filteredTransactions
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
