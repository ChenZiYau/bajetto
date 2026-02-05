/**
 * Budget Screen
 * Budget management and overview
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
import { BudgetCard, EmptyState } from '../components';
import { budgets } from '../data/placeholder';
import { buttonA11yProps } from '../utils/accessibility';

type PeriodType = 'weekly' | 'monthly' | 'yearly';

export const BudgetScreen: React.FC = () => {
  const colors = useColors();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('monthly');

  const filteredBudgets = budgets.filter((b) => b.period === selectedPeriod);

  const totalBudget = filteredBudgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = filteredBudgets.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = totalBudget - totalSpent;
  const overallPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  const getProgressColor = () => {
    if (overallPercentage >= 100) return colors.danger;
    if (overallPercentage >= 80) return colors.warning;
    return colors.primary;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar barStyle={colors.statusBarStyle} backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Budgets</Text>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.surface }]}
          {...buttonA11yProps('Add budget', 'Create a new budget')}
        >
          <Ionicons name="add" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Period Selector */}
      <View style={styles.periodSelector}>
        {(['weekly', 'monthly', 'yearly'] as PeriodType[]).map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodTab,
              { backgroundColor: selectedPeriod === period ? colors.primary : colors.surface },
            ]}
            onPress={() => setSelectedPeriod(period)}
            {...buttonA11yProps(`${period} period`, `View ${period} budgets`)}
          >
            <Text
              style={[
                styles.periodTabText,
                { color: selectedPeriod === period ? colors.textInverse : colors.textSecondary },
              ]}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Overview Card */}
        <View style={[styles.overviewCard, { backgroundColor: colors.surface }]}>
          <View style={styles.overviewHeader}>
            <Text style={[styles.overviewTitle, { color: colors.textPrimary }]}>
              Budget Overview
            </Text>
            <Text style={[styles.overviewPeriod, { color: colors.textSecondary }]}>
              January 2024
            </Text>
          </View>

          <View style={styles.overviewProgress}>
            <View style={[styles.progressBackground, { backgroundColor: colors.surfaceLight }]}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.min(overallPercentage, 100)}%`,
                    backgroundColor: getProgressColor(),
                  },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: colors.textSecondary }]}>
              {overallPercentage.toFixed(0)}% of total budget used
            </Text>
          </View>

          <View style={styles.overviewStats}>
            <View style={styles.overviewStatItem}>
              <View style={styles.statIndicator}>
                <View style={[styles.statDot, { backgroundColor: colors.primary }]} />
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Budget</Text>
              </View>
              <Text style={[styles.statValue, { color: colors.textPrimary }]}>
                ${totalBudget.toFixed(0)}
              </Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.overviewStatItem}>
              <View style={styles.statIndicator}>
                <View style={[styles.statDot, { backgroundColor: colors.expense }]} />
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Spent</Text>
              </View>
              <Text style={[styles.statValue, { color: colors.textPrimary }]}>
                ${totalSpent.toFixed(0)}
              </Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.overviewStatItem}>
              <View style={styles.statIndicator}>
                <View style={[styles.statDot, { backgroundColor: colors.success }]} />
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Left</Text>
              </View>
              <Text style={[styles.statValue, { color: colors.success }]}>
                ${totalRemaining.toFixed(0)}
              </Text>
            </View>
          </View>
        </View>

        {/* Budget Categories */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Category Budgets
          </Text>
          <TouchableOpacity {...buttonA11yProps('Budget settings', 'Configure budget settings')}>
            <Ionicons name="settings-outline" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {filteredBudgets.map((budget) => (
          <BudgetCard key={budget.id} budget={budget} />
        ))}

        {filteredBudgets.length === 0 && (
          <EmptyState
            icon="pie-chart-outline"
            title="No budgets set"
            description="Create a budget to start tracking your spending"
            actionText="Create Budget"
            onAction={() => {}}
          />
        )}

        {/* Tips Section */}
        <View style={[styles.tipsCard, { backgroundColor: colors.warning + '15' }]}>
          <View style={[styles.tipsIcon, { backgroundColor: colors.warning + '25' }]}>
            <Ionicons name="bulb" size={24} color={colors.warning} />
          </View>
          <View style={styles.tipsContent}>
            <Text style={[styles.tipsTitle, { color: colors.warning }]}>Budget Tip</Text>
            <Text style={[styles.tipsText, { color: colors.textSecondary }]}>
              Your food budget is at 70%. Consider meal prepping to save more this month.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        {...buttonA11yProps('Add budget', 'Create a new budget')}
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
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  periodTabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  overviewCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  overviewPeriod: {
    fontSize: 13,
  },
  overviewProgress: {
    marginBottom: 20,
  },
  progressBackground: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 12,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statLabel: {
    fontSize: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  statDivider: {
    width: 1,
    height: '100%',
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
  tipsCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  tipsIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipsContent: {
    flex: 1,
    marginLeft: 14,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  tipsText: {
    fontSize: 13,
    lineHeight: 18,
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
