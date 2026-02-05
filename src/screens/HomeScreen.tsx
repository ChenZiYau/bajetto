/**
 * Home Screen
 * Dashboard with balance overview and recent transactions
 */
import React from 'react';
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
import { SummaryCard, TransactionItem, SpendingChart } from '../components';
import {
  dashboardSummary,
  recentTransactions,
  monthlySpendingData,
} from '../data/placeholder';
import { formatCurrency } from '../utils/formatting';
import { buttonA11yProps, headerA11yProps } from '../utils/accessibility';

export const HomeScreen: React.FC = () => {
  const colors = useColors();

  // Dynamic styles based on theme
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    greeting: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    userName: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.textPrimary,
      marginTop: 2,
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textInverse,
    },
    balanceCard: {
      backgroundColor: colors.surface,
      borderRadius: 24,
      padding: 24,
      marginBottom: 16,
    },
    balanceLabel: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    balanceAmount: {
      fontSize: 36,
      fontWeight: '700',
      color: colors.textPrimary,
      marginBottom: 12,
    },
    savingsBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.success + '15',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },
    savingsText: {
      fontSize: 13,
      color: colors.success,
      marginLeft: 6,
      fontWeight: '500',
    },
    actionIcon: {
      width: 56,
      height: 56,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    actionLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    seeAllButton: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: '500',
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.container} edges={['top']}>
      <StatusBar
        barStyle={colors.statusBarStyle}
        backgroundColor={colors.background}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={dynamicStyles.greeting}>Good morning,</Text>
            <Text style={dynamicStyles.userName} {...headerA11yProps('John Doe')}>
              John Doe
            </Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            {...buttonA11yProps('Profile', 'View your profile')}
          >
            <View style={dynamicStyles.avatar}>
              <Text style={dynamicStyles.avatarText}>JD</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={dynamicStyles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={dynamicStyles.balanceLabel}>Total Balance</Text>
            <TouchableOpacity
              style={styles.eyeButton}
              {...buttonA11yProps('Toggle balance visibility', 'Hide or show your balance')}
            >
              <Ionicons name="eye-outline" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          <Text style={dynamicStyles.balanceAmount}>
            {formatCurrency(dashboardSummary.totalBalance)}
          </Text>
          <View style={styles.savingsRow}>
            <View style={dynamicStyles.savingsBadge}>
              <Ionicons name="trending-up" size={14} color={colors.success} />
              <Text style={dynamicStyles.savingsText}>
                {dashboardSummary.savingsRate}% savings rate this month
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <SummaryCard
            title="Income"
            amount={dashboardSummary.totalIncome}
            icon="arrow-down-circle"
            iconColor={colors.success}
            iconBackground={colors.success + '20'}
            compact
          />
          <View style={styles.statsSpacer} />
          <SummaryCard
            title="Expenses"
            amount={dashboardSummary.totalExpenses}
            icon="arrow-up-circle"
            iconColor={colors.expense}
            iconBackground={colors.expense + '20'}
            compact
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionButton}
            {...buttonA11yProps('Add transaction', 'Add a new transaction')}
          >
            <View style={[dynamicStyles.actionIcon, { backgroundColor: colors.primary + '20' }]}>
              <Ionicons name="add" size={24} color={colors.primary} />
            </View>
            <Text style={dynamicStyles.actionLabel}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            {...buttonA11yProps('Transfer', 'Make a transfer')}
          >
            <View style={[dynamicStyles.actionIcon, { backgroundColor: colors.success + '20' }]}>
              <Ionicons name="swap-horizontal" size={24} color={colors.success} />
            </View>
            <Text style={dynamicStyles.actionLabel}>Transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            {...buttonA11yProps('Budget', 'View your budgets')}
          >
            <View style={[dynamicStyles.actionIcon, { backgroundColor: colors.warning + '20' }]}>
              <Ionicons name="pie-chart" size={24} color={colors.warning} />
            </View>
            <Text style={dynamicStyles.actionLabel}>Budget</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            {...buttonA11yProps('Analytics', 'View spending analytics')}
          >
            <View style={[dynamicStyles.actionIcon, { backgroundColor: colors.info + '20' }]}>
              <Ionicons name="stats-chart" size={24} color={colors.info} />
            </View>
            <Text style={dynamicStyles.actionLabel}>Analytics</Text>
          </TouchableOpacity>
        </View>

        {/* Spending Chart */}
        <SpendingChart data={monthlySpendingData} />

        {/* Recent Transactions */}
        <View style={styles.sectionHeader}>
          <Text style={dynamicStyles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity {...buttonA11yProps('See all transactions', 'View all your transactions')}>
            <Text style={dynamicStyles.seeAllButton}>See All</Text>
          </TouchableOpacity>
        </View>

        {recentTransactions.slice(0, 5).map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Static styles (non-theme-dependent)
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 24,
  },
  profileButton: {
    padding: 2,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eyeButton: {
    padding: 4,
  },
  savingsRow: {
    flexDirection: 'row',
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  statsSpacer: {
    width: 12,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
});
