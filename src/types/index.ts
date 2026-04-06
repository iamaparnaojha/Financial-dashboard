export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  type: 'income' | 'expense';
  cardId?: string; // Optional card association
}

export interface Card {
  id: string;
  nickname: string;
  type: 'visa' | 'mastercard' | 'amex' | 'other';
  last4: string;
  expiry: string;
  balance: number;
  color: string;
}

export interface FinancialSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

export interface CategorySpending {
  category: string;
  amount: number;
  percentage: number;
}

export interface BalanceTrend {
  date: string;
  balance: number;
}

export interface Insights {
  highestSpendingCategory: string;
  monthlyComparison: number;
  averageTransaction: number;
  savingsRate: number;
}

export type UserRole = 'viewer' | 'admin';

export interface AppState {
  transactions: Transaction[];
  cards: Card[];
  userRole: UserRole;
  darkMode: boolean;
  filters: {
    category: string;
    type: string;
    dateRange: string;
    search: string;
  };
  sortBy: 'date' | 'amount' | 'category';
  sortOrder: 'asc' | 'desc';
}
