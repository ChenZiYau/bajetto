/**
 * Spending Chart Component
 * Bar chart showing monthly spending trends
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '../contexts/ThemeContext';
import { formatCurrency } from '../utils/formatting';

interface SpendingDataPoint {
  month: string;
  amount: number;
}

interface SpendingChartProps {
  data: SpendingDataPoint[];
}

export const SpendingChart: React.FC<SpendingChartProps> = ({ data }) => {
  const colors = useColors();
  const maxAmount = Math.max(...data.map((d) => d.amount));

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>Spending Trend</Text>
      <View style={styles.chartArea}>
        {data.map((item, index) => {
          const heightPercentage = (item.amount / maxAmount) * 100;
          const isLatest = index === data.length - 1;

          return (
            <View key={item.month} style={styles.barContainer}>
              <View style={styles.barWrapper}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${heightPercentage}%`,
                      backgroundColor: isLatest ? colors.primary : colors.primaryLight + '60',
                    },
                  ]}
                >
                  {isLatest && (
                    <View style={styles.amountBadge}>
                      <Text style={[styles.amountText, { color: colors.primary }]}>
                        {formatCurrency(item.amount, { compact: true })}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <Text
                style={[
                  styles.monthLabel,
                  { color: isLatest ? colors.primary : colors.textMuted },
                  isLatest && styles.monthLabelActive,
                ]}
              >
                {item.month}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
  },
  chartArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 140,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  barWrapper: {
    width: '100%',
    height: 110,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: 28,
    borderRadius: 8,
    position: 'relative',
  },
  amountBadge: {
    position: 'absolute',
    top: -24,
    left: -10,
    right: -10,
    alignItems: 'center',
  },
  amountText: {
    fontSize: 11,
    fontWeight: '600',
  },
  monthLabel: {
    fontSize: 12,
    marginTop: 8,
  },
  monthLabelActive: {
    fontWeight: '600',
  },
});
