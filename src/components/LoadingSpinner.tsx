/**
 * Loading Spinner Component
 * Reusable loading indicator with consistent styling
 */
import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useColors } from '../contexts/ThemeContext';

interface LoadingSpinnerProps {
  // Size of the spinner
  size?: 'small' | 'large';
  // Optional message to display
  message?: string;
  // Whether to show as full screen overlay
  fullScreen?: boolean;
  // Custom container style
  style?: ViewStyle;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  message,
  fullScreen = false,
  style,
}) => {
  const colors = useColors();

  if (fullScreen) {
    return (
      <View style={[styles.fullScreen, { backgroundColor: colors.background }, style]}>
        <View style={[styles.container, { backgroundColor: colors.surface }]}>
          <ActivityIndicator size={size} color={colors.primary} />
          {message && (
            <Text style={[styles.message, { color: colors.textSecondary }]}>
              {message}
            </Text>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.inline, style]}>
      <ActivityIndicator size={size} color={colors.primary} />
      {message && (
        <Text style={[styles.message, { color: colors.textSecondary }]}>
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  container: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    minWidth: 120,
  },
  inline: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    textAlign: 'center',
  },
});
