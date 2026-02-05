/**
 * Transaction Screen
 * List of all transactions with search and filter
 */
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../contexts/ThemeContext';
import { TransactionItem, EmptyState } from '../components';
import { recentTransactions } from '../data/placeholder';
import { formatDate } from '../utils/formatting';
import { buttonA11yProps, inputA11yProps } from '../utils/accessibility';

type FilterType = 'all' | 'income' | 'expense';

export const TransactionScreen: React.FC = () => {
  const colors = useColors();
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = recentTransactions.filter((transaction) => {
    if (filter !== 'all' && transaction.type !== filter) return false;
    if (searchQuery && !transaction.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Group transactions by date
  const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
    const date = transaction.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, typeof recentTransactions>);

  const getDayTotal = useCallback((transactions: typeof recentTransactions) => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return { income, expense };
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar barStyle={colors.statusBarStyle} backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Transactions</Text>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.surface }]}
          {...buttonA11yProps('Add transaction', 'Create a new transaction')}
        >
          <Ionicons name="add" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface }]}>
          <Ionicons name="search" size={20} color={colors.textMuted} />
          <TextInput
            style={[styles.searchInput, { color: colors.textPrimary }]}
            placeholder="Search transactions..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            {...inputA11yProps('Search transactions', 'Type to search')}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              {...buttonA11yProps('Clear search', 'Clear the search field')}
            >
              <Ionicons name="close-circle" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={[styles.filterIconButton, { backgroundColor: colors.surface }]}
          {...buttonA11yProps('Filter options', 'Open filter settings')}
        >
          <Ionicons name="options-outline" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        {(['all', 'income', 'expense'] as FilterType[]).map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterTab,
              { backgroundColor: filter === type ? colors.primary : colors.surface },
            ]}
            onPress={() => setFilter(type)}
            {...buttonA11yProps(`Filter ${type}`, `Show ${type} transactions`)}
          >
            <Text
              style={[
                styles.filterTabText,
                { color: filter === type ? colors.textInverse : colors.textSecondary },
              ]}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Transactions List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(groupedTransactions)
          .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
          .map(([date, transactions]) => {
            const totals = getDayTotal(transactions);
            return (
              <View key={date} style={styles.dateGroup}>
                <View style={styles.dateHeader}>
                  <Text style={[styles.dateText, { color: colors.textSecondary }]}>
                    {formatDate(date, 'relative') === 'Today' || formatDate(date, 'relative') === 'Yesterday'
                      ? formatDate(date, 'relative')
                      : new Date(date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric',
                        })}
                  </Text>
                  <View style={styles.dateTotals}>
                    {totals.income > 0 && (
                      <Text style={[styles.dateIncome, { color: colors.success }]}>
                        +${totals.income.toFixed(2)}
                      </Text>
                    )}
                    {totals.expense > 0 && (
                      <Text style={[styles.dateExpense, { color: colors.expense }]}>
                        -${totals.expense.toFixed(2)}
                      </Text>
                    )}
                  </View>
                </View>
                {transactions.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </View>
            );
          })}

        {filteredTransactions.length === 0 && (
          <EmptyState
            icon="receipt-outline"
            title="No transactions found"
            description={
              searchQuery
                ? 'Try adjusting your search'
                : 'Add your first transaction to get started'
            }
            actionText="Add Transaction"
            onAction={() => {}}
          />
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        {...buttonA11yProps('Add transaction', 'Create a new transaction')}
      >
        <Ionicons name="add" size={28} color={colors.textInverse} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },
  filterIconButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 8,
    gap: 10,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  dateGroup: {
    marginBottom: 20,
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
  },
  dateTotals: {
    flexDirection: 'row',
    gap: 12,
  },
  dateIncome: {
    fontSize: 13,
    fontWeight: '600',
  },
  dateExpense: {
    fontSize: 13,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
