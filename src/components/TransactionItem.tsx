/**
 * Transaction Item Component
 * Displays a single transaction in a list
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Transaction } from '../types';
import { useColors } from '../contexts/ThemeContext';
import { categoryIcons, categoryNames } from '../data/placeholder';
import { formatTransactionAmount, formatDate } from '../utils/formatting';
import { buttonA11yProps } from '../utils/accessibility';

interface TransactionItemProps {
  transaction: Transaction;
  onPress?: () => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onPress,
}) => {
  const colors = useColors();
  const isExpense = transaction.type === 'expense';
  const iconName = categoryIcons[transaction.category] || 'ellipsis-horizontal';
  const categoryColor = isExpense ? colors.expense : colors.income;
  const categoryName = categoryNames[transaction.category] || 'Other';

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.surface }]}
      onPress={onPress}
      activeOpacity={0.7}
      {...buttonA11yProps(
        `${transaction.title}, ${formatTransactionAmount(transaction.amount, isExpense)}`,
        `${categoryName}, ${formatDate(transaction.date, 'relative')}`
      )}
    >
      <View style={[styles.iconContainer, { backgroundColor: categoryColor + '20' }]}>
        <Ionicons name={iconName as any} size={22} color={categoryColor} />
      </View>
      <View style={styles.details}>
        <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={1}>
          {transaction.title}
        </Text>
        <Text style={[styles.category, { color: colors.textSecondary }]}>
          {categoryName} • {formatDate(transaction.date, 'relative')}
        </Text>
      </View>
      <Text style={[styles.amount, { color: categoryColor }]}>
        {formatTransactionAmount(transaction.amount, isExpense)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    flex: 1,
    marginLeft: 14,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  category: {
    fontSize: 13,
  },
  amount: {
    fontSize: 15,
    fontWeight: '700',
  },
});
