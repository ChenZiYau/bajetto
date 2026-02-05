/**
 * Theme Context Provider
 * Manages theme state with persistence and system preference detection
 */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import { useColorScheme, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Theme,
  ThemeMode,
  darkTheme,
  lightTheme,
  getTheme,
} from '../theme/colors';
import { STORAGE_KEYS, DEFAULT_SETTINGS } from '../config';

// =============================================================================
// TYPES
// =============================================================================
interface ThemeContextType {
  // Current resolved theme colors
  theme: Theme;
  // Current theme mode setting
  themeMode: ThemeMode;
  // Whether dark mode is active (resolved from system or manual)
  isDark: boolean;
  // Whether theme is still loading from storage
  isLoading: boolean;
  // Actions
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;
}

// =============================================================================
// CONTEXT
// =============================================================================
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// =============================================================================
// PROVIDER
// =============================================================================
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Get system color scheme
  const systemColorScheme = useColorScheme();

  // State
  const [themeMode, setThemeModeState] = useState<ThemeMode>(DEFAULT_SETTINGS.theme);
  const [isLoading, setIsLoading] = useState(true);

  // ==========================================================================
  // COMPUTED VALUES
  // ==========================================================================

  // Resolve actual dark/light based on mode and system preference
  const isDark = useMemo(() => {
    if (themeMode === 'system') {
      return systemColorScheme === 'dark';
    }
    return themeMode === 'dark';
  }, [themeMode, systemColorScheme]);

  // Get the resolved theme object
  const theme = useMemo(() => {
    return isDark ? darkTheme : lightTheme;
  }, [isDark]);

  // ==========================================================================
  // PERSISTENCE
  // ==========================================================================

  // Load saved theme on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          setThemeModeState(savedTheme as ThemeMode);
        }
      } catch (error) {
        console.warn('Failed to load theme preference:', error);
        // Fall back to default - no undefined behavior
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // Only matters if we're in system mode
      // React will re-render automatically via useColorScheme
    });

    return () => subscription.remove();
  }, []);

  // ==========================================================================
  // ACTIONS
  // ==========================================================================

  const setThemeMode = useCallback(async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.THEME, mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
      // Still update local state even if persistence fails
      setThemeModeState(mode);
    }
  }, []);

  const toggleTheme = useCallback(async () => {
    // If system, switch to opposite of current system theme
    // If manual, toggle between light/dark
    const newMode: ThemeMode = isDark ? 'light' : 'dark';
    await setThemeMode(newMode);
  }, [isDark, setThemeMode]);

  // ==========================================================================
  // CONTEXT VALUE
  // ==========================================================================

  const value = useMemo<ThemeContextType>(
    () => ({
      theme,
      themeMode,
      isDark,
      isLoading,
      setThemeMode,
      toggleTheme,
    }),
    [theme, themeMode, isDark, isLoading, setThemeMode, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// =============================================================================
// HOOK
// =============================================================================
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// =============================================================================
// UTILITY HOOK - for components that only need colors
// =============================================================================
export const useColors = (): Theme => {
  const { theme } = useTheme();
  return theme;
};
