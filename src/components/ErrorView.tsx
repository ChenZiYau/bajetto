/**
 * Error View Component
 * Displays error messages with retry functionality
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../contexts/ThemeContext';

interface ErrorViewProps {
  // Error message to display
  message?: string;
  // Error title
  title?: string;
  // Whether to show retry button
  showRetry?: boolean;
  // Retry callback
  onRetry?: () => void;
  // Custom icon
  icon?: string;
  // Full screen mode
  fullScreen?: boolean;
  // Custom style
  style?: ViewStyle;
}

export const ErrorView: React.FC<ErrorViewProps> = ({
  message = 'Something went wrong. Please try again.',
  title = 'Oops!',
  showRetry = true,
  onRetry,
  icon = 'alert-circle-outline',
  fullScreen = false,
  style,
}) => {
  const colors = useColors();

  const content = (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: colors.danger + '20' },
        ]}
      >
        <Ionicons name={icon as any} size={48} color={colors.danger} />
      </View>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      <Text style={[styles.message, { color: colors.textSecondary }]}>
        {message}
      </Text>
      {showRetry && onRetry && (
        <TouchableOpacity
          style={[styles.retryButton, { backgroundColor: colors.primary }]}
          onPress={onRetry}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Retry"
        >
          <Ionicons name="refresh" size={18} color={colors.textInverse} />
          <Text style={[styles.retryText, { color: colors.textInverse }]}>
            Try Again
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (fullScreen) {
    return (
      <View style={[styles.fullScreen, { backgroundColor: colors.background }]}>
        {content}
      </View>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  retryText: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
});
