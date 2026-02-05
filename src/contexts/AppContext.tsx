/**
 * App Context Provider
 * Manages global app state, settings, and provides error boundary
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_SETTINGS, STORAGE_KEYS, AppSettings } from '../config';

// =============================================================================
// TYPES
// =============================================================================
interface AppState {
  isInitialized: boolean;
  isLoading: boolean;
  error: Error | null;
}

interface AppContextType {
  // State
  state: AppState;
  settings: AppSettings;

  // Loading management
  setLoading: (loading: boolean) => void;

  // Error management
  setError: (error: Error | null) => void;
  clearError: () => void;

  // Settings management
  updateSettings: (updates: Partial<AppSettings>) => Promise<void>;
  resetSettings: () => Promise<void>;
}

// =============================================================================
// INITIAL STATE
// =============================================================================
const initialState: AppState = {
  isInitialized: false,
  isLoading: true,
  error: null,
};

// =============================================================================
// CONTEXT
// =============================================================================
const AppContext = createContext<AppContextType | undefined>(undefined);

// =============================================================================
// PROVIDER
// =============================================================================
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);
  const [settings, setSettings] = useState<AppSettings>({ ...DEFAULT_SETTINGS });

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================
  useEffect(() => {
    const initialize = async () => {
      try {
        // Load saved settings
        const savedSettings = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
        if (savedSettings) {
          const parsed = JSON.parse(savedSettings);
          // Merge with defaults to ensure all keys exist
          setSettings({ ...DEFAULT_SETTINGS, ...parsed });
        }

        setState((prev) => ({
          ...prev,
          isInitialized: true,
          isLoading: false,
        }));
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setState((prev) => ({
          ...prev,
          isInitialized: true,
          isLoading: false,
          error: error instanceof Error ? error : new Error('Initialization failed'),
        }));
      }
    };

    initialize();
  }, []);

  // ==========================================================================
  // LOADING MANAGEMENT
  // ==========================================================================
  const setLoading = useCallback((loading: boolean) => {
    setState((prev) => ({ ...prev, isLoading: loading }));
  }, []);

  // ==========================================================================
  // ERROR MANAGEMENT
  // ==========================================================================
  const setError = useCallback((error: Error | null) => {
    setState((prev) => ({ ...prev, error }));
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  // ==========================================================================
  // SETTINGS MANAGEMENT
  // ==========================================================================
  const updateSettings = useCallback(async (updates: Partial<AppSettings>) => {
    try {
      const newSettings = { ...settings, ...updates };
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error('Failed to update settings:', error);
      throw error;
    }
  }, [settings]);

  const resetSettings = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.SETTINGS);
      setSettings({ ...DEFAULT_SETTINGS });
    } catch (error) {
      console.error('Failed to reset settings:', error);
      throw error;
    }
  }, []);

  // ==========================================================================
  // CONTEXT VALUE
  // ==========================================================================
  const value = useMemo<AppContextType>(
    () => ({
      state,
      settings,
      setLoading,
      setError,
      clearError,
      updateSettings,
      resetSettings,
    }),
    [state, settings, setLoading, setError, clearError, updateSettings, resetSettings]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// =============================================================================
// HOOKS
// =============================================================================
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const useSettings = (): AppSettings => {
  const { settings } = useApp();
  return settings;
};
