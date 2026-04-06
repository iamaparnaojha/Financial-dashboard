import { Transaction, Card } from '../types';

export const mockTransactions: Transaction[] = [
  // Income transactions
  {
    id: '1',
    date: '2026-01-15',
    amount: 5000,
    category: 'Salary',
    description: 'Monthly salary payment',
    type: 'income'
  },
  {
    id: '2',
    date: '2026-01-20',
    amount: 1200,
    category: 'Freelance',
    description: 'Web development project',
    type: 'income'
  },
  {
    id: '3',
    date: '2026-02-15',
    amount: 5000,
    category: 'Salary',
    description: 'Monthly salary payment',
    type: 'income'
  },
  {
    id: '4',
    date: '2026-02-25',
    amount: 800,
    category: 'Investment',
    description: 'Stock dividend payment',
    type: 'income'
  },
  {
    id: '5',
    date: '2026-03-15',
    amount: 5200,
    category: 'Salary',
    description: 'Monthly salary with bonus',
    type: 'income'
  },
  {
    id: '6',
    date: '2026-03-22',
    amount: 1500,
    category: 'Freelance',
    description: 'Mobile app development',
    type: 'income'
  },
  {
    id: '7',
    date: '2026-04-15',
    amount: 5000,
    category: 'Salary',
    description: 'Monthly salary payment',
    type: 'income'
  },
  {
    id: '8',
    date: '2026-04-28',
    amount: 300,
    category: 'Other',
    description: 'Cashback rewards',
    type: 'income'
  },
  
  // Expense transactions
  {
    id: '9',
    date: '2026-01-05',
    amount: 1200,
    category: 'Rent',
    description: 'Monthly rent payment',
    type: 'expense'
  },
  {
    id: '10',
    date: '2026-01-08',
    amount: 250,
    category: 'Groceries',
    description: 'Weekly grocery shopping',
    type: 'expense'
  },
  {
    id: '11',
    date: '2026-01-12',
    amount: 85,
    category: 'Utilities',
    description: 'Electricity bill',
    type: 'expense'
  },
  {
    id: '12',
    date: '2026-01-15',
    amount: 120,
    category: 'Internet',
    description: 'Monthly internet subscription',
    type: 'expense'
  },
  {
    id: '13',
    date: '2026-01-18',
    amount: 45,
    category: 'Entertainment',
    description: 'Movie tickets',
    type: 'expense'
  },
  {
    id: '14',
    date: '2026-01-22',
    amount: 180,
    category: 'Dining',
    description: 'Restaurant dinner',
    type: 'expense'
  },
  {
    id: '15',
    date: '2026-01-25',
    amount: 65,
    category: 'Transportation',
    description: 'Gas and parking',
    type: 'expense'
  },
  {
    id: '16',
    date: '2026-01-28',
    amount: 320,
    category: 'Shopping',
    description: 'Clothing and accessories',
    type: 'expense'
  },
  {
    id: '17',
    date: '2026-02-05',
    amount: 1200,
    category: 'Rent',
    description: 'Monthly rent payment',
    type: 'expense'
  },
  {
    id: '18',
    date: '2026-02-09',
    amount: 280,
    category: 'Groceries',
    description: 'Weekly grocery shopping',
    type: 'expense'
  },
  {
    id: '19',
    date: '2026-02-12',
    amount: 95,
    category: 'Utilities',
    description: 'Gas and water bill',
    type: 'expense'
  },
  {
    id: '20',
    date: '2026-02-16',
    amount: 120,
    category: 'Internet',
    description: 'Monthly internet subscription',
    type: 'expense'
  },
  {
    id: '21',
    date: '2026-02-19',
    amount: 150,
    category: 'Healthcare',
    description: 'Doctor visit copay',
    type: 'expense'
  },
  {
    id: '22',
    date: '2026-02-23',
    amount: 220,
    category: 'Dining',
    description: 'Weekend brunch',
    type: 'expense'
  },
  {
    id: '23',
    date: '2026-02-26',
    amount: 75,
    category: 'Transportation',
    description: 'Public transport pass',
    type: 'expense'
  },
  {
    id: '24',
    date: '2026-02-28',
    amount: 450,
    category: 'Shopping',
    description: 'Electronics purchase',
    type: 'expense'
  },
  {
    id: '25',
    date: '2026-03-05',
    amount: 1200,
    category: 'Rent',
    description: 'Monthly rent payment',
    type: 'expense'
  },
  {
    id: '26',
    date: '2026-03-08',
    amount: 265,
    category: 'Groceries',
    description: 'Weekly grocery shopping',
    type: 'expense'
  },
  {
    id: '27',
    date: '2026-03-11',
    amount: 110,
    category: 'Utilities',
    description: 'Electricity bill',
    type: 'expense'
  },
  {
    id: '28',
    date: '2026-03-15',
    amount: 120,
    category: 'Internet',
    description: 'Monthly internet subscription',
    type: 'expense'
  },
  {
    id: '29',
    date: '2026-03-18',
    amount: 95,
    category: 'Entertainment',
    description: 'Concert tickets',
    type: 'expense'
  },
  {
    id: '30',
    date: '2026-03-22',
    amount: 180,
    category: 'Dining',
    description: 'Birthday dinner',
    type: 'expense'
  },
  {
    id: '31',
    date: '2026-03-25',
    amount: 85,
    category: 'Transportation',
    description: 'Ride sharing',
    type: 'expense'
  },
  {
    id: '32',
    date: '2026-03-28',
    amount: 280,
    category: 'Shopping',
    description: 'Home supplies',
    type: 'expense'
  },
  {
    id: '33',
    date: '2026-03-30',
    amount: 150,
    category: 'Healthcare',
    description: 'Pharmacy purchase',
    type: 'expense'
  },
  {
    id: '34',
    date: '2026-04-05',
    amount: 1200,
    category: 'Rent',
    description: 'Monthly rent payment',
    type: 'expense'
  },
  {
    id: '35',
    date: '2026-04-09',
    amount: 290,
    category: 'Groceries',
    description: 'Weekly grocery shopping',
    type: 'expense'
  },
  {
    id: '36',
    date: '2026-04-12',
    amount: 105,
    category: 'Utilities',
    description: 'Gas and water bill',
    type: 'expense'
  },
  {
    id: '37',
    date: '2026-04-15',
    amount: 120,
    category: 'Internet',
    description: 'Monthly internet subscription',
    type: 'expense'
  },
  {
    id: '38',
    date: '2026-04-18',
    amount: 135,
    category: 'Entertainment',
    description: 'Streaming services',
    type: 'expense'
  },
  {
    id: '39',
    date: '2026-04-22',
    amount: 195,
    category: 'Dining',
    description: 'Team lunch',
    type: 'expense'
  },
  {
    id: '40',
    date: '2026-04-25',
    amount: 70,
    category: 'Transportation',
    description: 'Gas and parking',
    type: 'expense'
  },
  {
    id: '41',
    date: '2026-04-28',
    amount: 380,
    category: 'Shopping',
    description: 'Gym equipment',
    type: 'expense'
  }
];

export const categories = [
  'Salary',
  'Freelance',
  'Investment',
  'Other',
  'Rent',
  'Groceries',
  'Utilities',
  'Internet',
  'Entertainment',
  'Dining',
  'Transportation',
  'Shopping',
  'Healthcare'
];

export const mockCards: Card[] = [
  {
    id: 'c1',
    nickname: 'Main Savings',
    type: 'visa',
    last4: '4242',
    expiry: '12/28',
    balance: 12500.50,
    color: 'blue'
  },
  {
    id: 'c2',
    nickname: 'Business Credit',
    type: 'mastercard',
    last4: '8812',
    expiry: '09/27',
    balance: 4200.75,
    color: 'purple'
  },
  {
    id: 'c3',
    nickname: 'Travel Card',
    type: 'amex',
    last4: '1004',
    expiry: '05/29',
    balance: 1850.20,
    color: 'emerald'
  }
];
