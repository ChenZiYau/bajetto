/**
 * Expenses Screen
 * Detailed expense analytics and breakdown
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../contexts/ThemeContext';
import { ExpensePieChart } from '../components';
import { expenseSummary, recentTransactions, categoryIcons, categoryNames } from '../data/placeholder';
import { buttonA11yProps } from '../utils/accessibility';

type TimeRange = 'week' | 'month' | 'year';

export const ExpensesScreen: React.FC = () => {
  const colors = useColors();
  const [timeRange, setTimeRange] = useState<TimeRange>('month');

  const totalExpenses = expenseSummary.reduce((sum, item) => sum + item.amount, 0);
  const totalTransactions = expenseSummary.reduce((sum, item) => sum + item.transactionCount, 0);

  // Get top spending categories
  const sortedCategories = [...expenseSummary].sort((a, b) => b.amount - a.amount);
  const topCategory = sortedCategories[0];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar barStyle={colors.statusBarStyle} backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Expenses</Text>
        <TouchableOpacity
          style={[styles.exportButton, { backgroundColor: colors.surface }]}
          {...buttonA11yProps('Export data', 'Export expense data')}
        >
          <Ionicons name="download-outline" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Time Range Selector */}
      <View style={styles.timeRangeContainer}>
        {(['week', 'month', 'year'] as TimeRange[]).map((range) => (
          <TouchableOpacity
            key={range}
            style={[
              styles.timeRangeTab,
              { backgroundColor: timeRange === range ? colors.primary : colors.surface },
            ]}
            onPress={() => setTimeRange(range)}
            {...buttonA11yProps(
              range === 'week' ? 'This Week' : range === 'month' ? 'This Month' : 'This Year',
              `View ${range}ly expenses`
            )}
          >
            <Text
              style={[
                styles.timeRangeText,
                { color: timeRange === range ? colors.textInverse : colors.textSecondary },
              ]}
            >
              {range === 'week' ? 'This Week' : range === 'month' ? 'This Month' : 'This Year'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary Stats */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: colors.surface }]}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Total Spent</Text>
            <Text style={[styles.summaryValue, { color: colors.textPrimary }]}>
              ${totalExpenses.toFixed(2)}
            </Text>
            <View style={styles.summaryTrend}>
              <Ionicons name="trending-up" size={14} color={colors.danger} />
              <Text style={[styles.summaryTrendText, { color: colors.textSecondary }]}>
                +12% vs last month
              </Text>
            </View>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: colors.surface }]}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Transactions</Text>
            <Text style={[styles.summaryValue, { color: colors.textPrimary }]}>
              {totalTransactions}
            </Text>
            <View style={styles.summaryTrend}>
              <Ionicons name="receipt-outline" size={14} color={colors.textSecondary} />
              <Text style={[styles.summaryTrendText, { color: colors.textSecondary }]}>
                Avg ${(totalExpenses / totalTransactions).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Pie Chart */}
        <ExpensePieChart data={expenseSummary} totalAmount={totalExpenses} />

        {/* Top Spending Category */}
        <View style={[styles.insightCard, { backgroundColor: colors.warning + '12' }]}>
          <View style={styles.insightHeader}>
            <Ionicons name="flash" size={20} color={colors.warning} />
            <Text style={[styles.insightTitle, { color: colors.warning }]}>Spending Insight</Text>
          </View>
          <Text style={[styles.insightText, { color: colors.textSecondary }]}>
            Your highest expense this month is{' '}
            <Text style={{ color: topCategory.color, fontWeight: '700' }}>
              {categoryNames[topCategory.category]}
            </Text>{' '}
            at ${topCategory.amount.toFixed(2)} ({topCategory.percentage.toFixed(1)}% of total).
          </Text>
        </View>

        {/* Category Breakdown */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Category Breakdown
          </Text>
          <TouchableOpacity {...buttonA11yProps('View details', 'See detailed breakdown')}>
            <Text style={[styles.seeAllButton, { color: colors.primary }]}>Details</Text>
          </TouchableOpacity>
        </View>

        {sortedCategories.map((item, index) => (
          <TouchableOpacity
            key={item.category}
            style={[styles.categoryItem, { backgroundColor: colors.surface }]}
            {...buttonA11yProps(
              categoryNames[item.category],
              `${item.transactionCount} transactions, $${item.amount.toFixed(2)}`
            )}
          >
            <View style={[styles.categoryRank, { backgroundColor: colors.surfaceLight }]}>
              <Text style={[styles.rankText, { color: colors.textSecondary }]}>{index + 1}</Text>
            </View>
            <View style={[styles.categoryIcon, { backgroundColor: item.color + '20' }]}>
              <Ionicons
                name={categoryIcons[item.category] as any}
                size={20}
                color={item.color}
              />
            </View>
            <View style={styles.categoryInfo}>
              <Text style={[styles.categoryName, { color: colors.textPrimary }]}>
                {categoryNames[item.category]}
              </Text>
              <Text style={[styles.categoryTransactions, { color: colors.textSecondary }]}>
                {item.transactionCount} transaction{item.transactionCount !== 1 ? 's' : ''}
              </Text>
            </View>
            <View style={styles.categoryAmount}>
              <Text style={[styles.amountText, { color: colors.textPrimary }]}>
                ${item.amount.toFixed(2)}
              </Text>
              <Text style={[styles.percentageText, { color: item.color }]}>
                {item.percentage.toFixed(1)}%
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Recent Expense Transactions */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Recent Expenses</Text>
          <TouchableOpacity {...buttonA11yProps('See all expenses', 'View all expense transactions')}>
            <Text style={[styles.seeAllButton, { color: colors.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>

        {recentTransactions
          .filter((t) => t.type === 'expense')
          .slice(0, 4)
          .map((transaction) => (
            <TouchableOpacity
              key={transaction.id}
              style={[styles.transactionItem, { backgroundColor: colors.surface }]}
              {...buttonA11yProps(transaction.title, `-$${transaction.amount.toFixed(2)}`)}
            >
              <View
                style={[
                  styles.transactionIcon,
                  {
                    backgroundColor:
                      expenseSummary.find((e) => e.category === transaction.category)?.color +
                        '20' || colors.categoryOther + '20',
                  },
                ]}
              >
                <Ionicons
                  name={categoryIcons[transaction.category] as any}
                  size={18}
                  color={
                    expenseSummary.find((e) => e.category === transaction.category)?.color ||
                    colors.categoryOther
                  }
                />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={[styles.transactionTitle, { color: colors.textPrimary }]}>
                  {transaction.title}
                </Text>
                <Text style={[styles.transactionDate, { color: colors.textSecondary }]}>
                  {transaction.date}
                </Text>
              </View>
              <Text style={[styles.transactionAmount, { color: colors.expense }]}>
                -${transaction.amount.toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
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
  exportButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeRangeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  timeRangeTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  timeRangeText: {
    fontSize: 13,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
  },
  summaryLabel: {
    fontSize: 13,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  summaryTrend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryTrendText: {
    fontSize: 12,
    marginLeft: 4,
  },
  insightCard: {
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    marginBottom: 24,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  insightText: {
    fontSize: 14,
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  seeAllButton: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  categoryRank: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    fontSize: 12,
    fontWeight: '600',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  categoryTransactions: {
    fontSize: 12,
  },
  categoryAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 15,
    fontWeight: '600',
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  transactionIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
});
