/**
 * Summary Card Component
 * Displays financial summary with icon and optional trend indicator
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../contexts/ThemeContext';
import { formatCurrency } from '../utils/formatting';

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: string;
  iconColor: string;
  iconBackground: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  compact?: boolean;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  amount,
  icon,
  iconColor,
  iconBackground,
  trend,
  compact = false,
}) => {
  const colors = useColors();

  if (compact) {
    return (
      <View style={[styles.compactContainer, { backgroundColor: colors.surface }]}>
        <View style={[styles.compactIconContainer, { backgroundColor: iconBackground }]}>
          <Ionicons name={icon as any} size={18} color={iconColor} />
        </View>
        <View style={styles.compactContent}>
          <Text style={[styles.compactTitle, { color: colors.textSecondary }]}>
            {title}
          </Text>
          <Text style={[styles.compactAmount, { color: iconColor }]}>
            {formatCurrency(amount, { compact: true })}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: iconBackground }]}>
          <Ionicons name={icon as any} size={22} color={iconColor} />
        </View>
        {trend && (
          <View
            style={[
              styles.trendBadge,
              { backgroundColor: trend.isPositive ? colors.success + '20' : colors.danger + '20' },
            ]}
          >
            <Ionicons
              name={trend.isPositive ? 'arrow-up' : 'arrow-down'}
              size={12}
              color={trend.isPositive ? colors.success : colors.danger}
            />
            <Text
              style={[
                styles.trendText,
                { color: trend.isPositive ? colors.success : colors.danger },
              ]}
            >
              {trend.value}%
            </Text>
          </View>
        )}
      </View>
      <Text style={[styles.title, { color: colors.textSecondary }]}>{title}</Text>
      <Text style={[styles.amount, { color: colors.textPrimary }]}>
        {formatCurrency(amount, { compact: true })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 2,
  },
  title: {
    fontSize: 13,
    marginBottom: 4,
  },
  amount: {
    fontSize: 22,
    fontWeight: '700',
  },
  // Compact styles
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 14,
    flex: 1,
  },
  compactIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactContent: {
    marginLeft: 12,
    flex: 1,
  },
  compactTitle: {
    fontSize: 12,
    marginBottom: 2,
  },
  compactAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
});
