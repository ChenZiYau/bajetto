/**
 * Expense Pie Chart Component
 * Donut chart visualization with legend
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ExpenseSummary } from '../types';
import { useColors } from '../contexts/ThemeContext';
import { categoryIcons, categoryNames } from '../data/placeholder';

interface ExpensePieChartProps {
  data: ExpenseSummary[];
  totalAmount: number;
}

export const ExpensePieChart: React.FC<ExpensePieChartProps> = ({ data, totalAmount }) => {
  const colors = useColors();
  // Simple donut chart visualization using nested views
  const sortedData = [...data].sort((a, b) => b.percentage - a.percentage);

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.chartContainer}>
        {/* Simplified donut representation */}
        <View style={[styles.donutOuter, { backgroundColor: colors.surfaceLight }]}>
          <View style={[styles.donutInner, { backgroundColor: colors.surface }]}>
            <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>Total</Text>
            <Text style={[styles.totalAmount, { color: colors.textPrimary }]}>
              ${totalAmount.toFixed(0)}
            </Text>
          </View>
          {/* Colored segments around the donut */}
          {sortedData.slice(0, 6).map((item, index) => {
            const rotation = sortedData
              .slice(0, index)
              .reduce((acc, curr) => acc + (curr.percentage * 3.6), 0);
            return (
              <View
                key={item.category}
                style={[
                  styles.segment,
                  {
                    backgroundColor: item.color,
                    transform: [{ rotate: `${rotation}deg` }],
                    opacity: 0.8 - index * 0.1,
                  },
                ]}
              />
            );
          })}
        </View>
      </View>

      <View style={styles.legendContainer}>
        {sortedData.map((item) => (
          <View key={item.category} style={styles.legendItem}>
            <View style={styles.legendLeft}>
              <View style={[styles.legendDot, { backgroundColor: item.color }]} />
              <View style={[styles.legendIcon, { backgroundColor: item.color + '20' }]}>
                <Ionicons
                  name={categoryIcons[item.category] as any}
                  size={14}
                  color={item.color}
                />
              </View>
              <Text style={[styles.legendLabel, { color: colors.textPrimary }]}>
                {categoryNames[item.category]}
              </Text>
            </View>
            <View style={styles.legendRight}>
              <Text style={[styles.legendAmount, { color: colors.textPrimary }]}>
                ${item.amount.toFixed(0)}
              </Text>
              <Text style={[styles.legendPercentage, { color: colors.textSecondary }]}>
                {item.percentage.toFixed(1)}%
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  donutOuter: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  donutInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  segment: {
    position: 'absolute',
    width: 30,
    height: 80,
    top: 0,
    left: 65,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    transformOrigin: 'center bottom',
  },
  totalLabel: {
    fontSize: 12,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 2,
  },
  legendContainer: {
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  legendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  legendIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  legendLabel: {
    fontSize: 14,
    flex: 1,
  },
  legendRight: {
    alignItems: 'flex-end',
  },
  legendAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
  legendPercentage: {
    fontSize: 12,
    marginTop: 2,
  },
});
