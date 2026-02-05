/**
 * Budget Card Component
 * Displays budget progress with category info
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Budget } from '../types';
import { useColors } from '../contexts/ThemeContext';
import { categoryIcons, categoryNames } from '../data/placeholder';
import { buttonA11yProps } from '../utils/accessibility';

interface BudgetCardProps {
  budget: Budget;
  onPress?: () => void;
}

export const BudgetCard: React.FC<BudgetCardProps> = ({ budget, onPress }) => {
  const colors = useColors();
  const percentage = (budget.spent / budget.limit) * 100;
  const isOverBudget = percentage >= 100;
  const isNearLimit = percentage >= 80 && percentage < 100;
  const remaining = budget.limit - budget.spent;
  const iconName = categoryIcons[budget.category] || 'ellipsis-horizontal';
  const categoryName = categoryNames[budget.category] || 'Other';

  const getStatusColor = () => {
    if (isOverBudget) return colors.danger;
    if (isNearLimit) return colors.warning;
    return budget.color;
  };

  const statusText = isOverBudget
    ? `$${Math.abs(remaining).toFixed(0)} over budget`
    : `$${remaining.toFixed(0)} remaining`;

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.surface }]}
      onPress={onPress}
      activeOpacity={0.7}
      {...buttonA11yProps(
        `${categoryName} budget`,
        `${statusText}, ${percentage.toFixed(0)}% used`
      )}
    >
      <View style={styles.header}>
        <View style={styles.categoryInfo}>
          <View style={[styles.iconContainer, { backgroundColor: budget.color + '20' }]}>
            <Ionicons name={iconName as any} size={20} color={budget.color} />
          </View>
          <View style={styles.categoryText}>
            <Text style={[styles.categoryName, { color: colors.textPrimary }]}>
              {categoryName}
            </Text>
            <Text style={[styles.period, { color: colors.textSecondary }]}>
              {budget.period}
            </Text>
          </View>
        </View>
        <View style={styles.amountInfo}>
          <Text style={[styles.spent, { color: colors.textPrimary }]}>
            ${budget.spent.toFixed(0)}
          </Text>
          <Text style={[styles.limit, { color: colors.textSecondary }]}>
            / ${budget.limit.toFixed(0)}
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBackground, { backgroundColor: colors.surfaceLight }]}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${Math.min(percentage, 100)}%`,
                backgroundColor: getStatusColor(),
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.remaining, { color: getStatusColor() }]}>
          {statusText}
        </Text>
        <Text style={[styles.percentage, { color: colors.textSecondary }]}>
          {percentage.toFixed(0)}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    marginLeft: 12,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '600',
  },
  period: {
    fontSize: 12,
    textTransform: 'capitalize',
    marginTop: 2,
  },
  amountInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  spent: {
    fontSize: 18,
    fontWeight: '700',
  },
  limit: {
    fontSize: 14,
    marginLeft: 2,
  },
  progressContainer: {
    marginBottom: 10,
  },
  progressBackground: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  remaining: {
    fontSize: 13,
    fontWeight: '500',
  },
  percentage: {
    fontSize: 13,
    fontWeight: '500',
  },
});
