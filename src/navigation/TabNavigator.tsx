/**
 * Tab Navigator
 * Bottom tab navigation with themed styling
 */
import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../contexts/ThemeContext';
import {
  HomeScreen,
  TransactionScreen,
  BudgetScreen,
  ExpensesScreen,
  SettingsScreen,
} from '../screens';

const Tab = createBottomTabNavigator();

type TabIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

const getTabIcon = (routeName: string, focused: boolean) => {
  let iconName: keyof typeof Ionicons.glyphMap = 'home';

  switch (routeName) {
    case 'Home':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'Transactions':
      iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
      break;
    case 'Budget':
      iconName = focused ? 'pie-chart' : 'pie-chart-outline';
      break;
    case 'Expenses':
      iconName = focused ? 'stats-chart' : 'stats-chart-outline';
      break;
    case 'Settings':
      iconName = focused ? 'settings' : 'settings-outline';
      break;
  }

  return iconName;
};

export const TabNavigator: React.FC = () => {
  const colors = useColors();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }: TabIconProps) => {
          const iconName = getTabIcon(route.name, focused);
          return (
            <View style={styles.iconContainer}>
              {focused && (
                <View style={[styles.activeIndicator, { backgroundColor: colors.primary }]} />
              )}
              <Ionicons name={iconName} size={24} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
          },
        ],
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
        headerShown: false,
        // Accessibility
        tabBarAccessibilityLabel: route.name,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarAccessibilityLabel: 'Home tab' }}
      />
      <Tab.Screen
        name="Transactions"
        component={TransactionScreen}
        options={{ tabBarAccessibilityLabel: 'Transactions tab' }}
      />
      <Tab.Screen
        name="Budget"
        component={BudgetScreen}
        options={{ tabBarAccessibilityLabel: 'Budget tab' }}
      />
      <Tab.Screen
        name="Expenses"
        component={ExpensesScreen}
        options={{ tabBarAccessibilityLabel: 'Expenses tab' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarAccessibilityLabel: 'Settings tab' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0,
    height: Platform.OS === 'ios' ? 88 : 70,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 28 : 10,
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4,
  },
  tabBarItem: {
    paddingVertical: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: -10,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});
