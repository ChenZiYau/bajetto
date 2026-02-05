export type TransactionType = 'income' | 'expense';

export type CategoryType =
  | 'food'
  | 'transport'
  | 'shopping'
  | 'entertainment'
  | 'bills'
  | 'health'
  | 'education'
  | 'salary'
  | 'freelance'
  | 'investment'
  | 'other';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: CategoryType;
  date: string;
  note?: string;
}

export interface Budget {
  id: string;
  category: CategoryType;
  limit: number;
  spent: number;
  period: 'weekly' | 'monthly' | 'yearly';
  color: string;
}

export interface ExpenseSummary {
  category: CategoryType;
  amount: number;
  percentage: number;
  color: string;
  transactionCount: number;
}

export interface DashboardSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  savingsRate: number;
}

export interface SettingsOption {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
}
