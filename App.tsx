/**
 * Bajetto App Entry Point
 * Personal Finance Management App
 */
import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { AppProvider } from './src/contexts/AppContext';
import { TabNavigator } from './src/navigation/TabNavigator';
import { LoadingSpinner } from './src/components';
import { setupKeyboardShortcuts } from './src/utils/accessibility';
import { ShortcutAction } from './src/config';

// =============================================================================
// THEMED APP CONTENT
// Separated to access theme context
// =============================================================================
const AppContent: React.FC = () => {
  const { theme, isDark, isLoading } = useTheme();

  // Setup keyboard shortcuts (web only)
  useEffect(() => {
    const handleShortcut = (action: ShortcutAction) => {
      // Handle keyboard shortcuts
      // Navigation shortcuts would be handled by navigation ref
      switch (action) {
        case 'toggle_theme':
          // Theme toggle is handled separately
          break;
        case 'show_shortcuts':
          // Could show a modal with shortcuts
          console.log('Keyboard shortcuts: Alt+H (Home), Alt+T (Transactions), Alt+B (Budget), Alt+E (Expenses), Alt+S (Settings)');
          break;
        default:
          console.log('Shortcut action:', action);
      }
    };

    const cleanup = setupKeyboardShortcuts(handleShortcut);
    return cleanup;
  }, []);

  // Show loading spinner while theme loads
  if (isLoading) {
    return <LoadingSpinner fullScreen message="Loading..." />;
  }

  return (
    <NavigationContainer
      theme={{
        dark: isDark,
        colors: {
          primary: theme.primary,
          background: theme.background,
          card: theme.surface,
          text: theme.textPrimary,
          border: theme.border,
          notification: theme.primary,
        },
        fonts: {
          regular: { fontFamily: 'System', fontWeight: '400' },
          medium: { fontFamily: 'System', fontWeight: '500' },
          bold: { fontFamily: 'System', fontWeight: '700' },
          heavy: { fontFamily: 'System', fontWeight: '900' },
        },
      }}
    >
      <StatusBar
        barStyle={theme.statusBarStyle}
        backgroundColor={theme.background}
      />
      <TabNavigator />
    </NavigationContainer>
  );
};

// =============================================================================
// ROOT APP COMPONENT
// =============================================================================
export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}
