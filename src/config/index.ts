/**
 * Application Configuration
 * Single source of truth for all app settings and defaults
 */

// =============================================================================
// APP METADATA
// =============================================================================
export const APP_CONFIG = {
  name: 'Bajetto',
  version: '1.0.0',
  buildNumber: 1,
} as const;

// =============================================================================
// DEFAULT SETTINGS
// All settings are initialized to these values on first load
// =============================================================================
export const DEFAULT_SETTINGS = {
  // Theme
  theme: 'system' as 'light' | 'dark' | 'system',

  // Notifications
  notificationsEnabled: true,
  budgetAlerts: true,
  weeklyReports: true,

  // Security
  biometricEnabled: false,
  pinEnabled: false,

  // Display
  currency: 'USD',
  currencySymbol: '$',
  language: 'en',

  // Data
  autoBackup: false,
  backupFrequency: 'weekly' as 'daily' | 'weekly' | 'monthly',
} as const;

export type AppSettings = typeof DEFAULT_SETTINGS;

// =============================================================================
// STORAGE KEYS
// Centralized keys for AsyncStorage to prevent typos
// =============================================================================
export const STORAGE_KEYS = {
  THEME: '@bajetto/theme',
  SETTINGS: '@bajetto/settings',
  USER: '@bajetto/user',
  ONBOARDING_COMPLETE: '@bajetto/onboarding_complete',
  LAST_SYNC: '@bajetto/last_sync',
} as const;

// =============================================================================
// API CONFIGURATION (for future use)
// =============================================================================
export const API_CONFIG = {
  baseUrl: 'https://api.bajetto.app',
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
} as const;

// =============================================================================
// VALIDATION RULES
// Reusable validation constraints
// =============================================================================
export const VALIDATION = {
  // Budget limits
  budget: {
    minAmount: 0,
    maxAmount: 999999999,
    minNameLength: 1,
    maxNameLength: 50,
  },
  // Transaction limits
  transaction: {
    minAmount: 0.01,
    maxAmount: 999999999,
    minTitleLength: 1,
    maxTitleLength: 100,
    maxNoteLength: 500,
  },
  // Pin/Security
  pin: {
    length: 4,
    maxAttempts: 5,
  },
} as const;

// =============================================================================
// KEYBOARD SHORTCUTS (for web accessibility)
// Every key mapping has a defined purpose
// =============================================================================
export const KEYBOARD_SHORTCUTS = {
  // Navigation
  'Alt+H': { action: 'navigate_home', description: 'Go to Home' },
  'Alt+T': { action: 'navigate_transactions', description: 'Go to Transactions' },
  'Alt+B': { action: 'navigate_budget', description: 'Go to Budget' },
  'Alt+E': { action: 'navigate_expenses', description: 'Go to Expenses' },
  'Alt+S': { action: 'navigate_settings', description: 'Go to Settings' },

  // Actions
  'Alt+N': { action: 'new_transaction', description: 'New Transaction' },
  'Alt+/': { action: 'show_shortcuts', description: 'Show Keyboard Shortcuts' },
  'Escape': { action: 'close_modal', description: 'Close Modal/Dialog' },

  // Theme
  'Alt+D': { action: 'toggle_theme', description: 'Toggle Dark/Light Mode' },
} as const;

export type ShortcutKey = keyof typeof KEYBOARD_SHORTCUTS;
export type ShortcutAction = typeof KEYBOARD_SHORTCUTS[ShortcutKey]['action'];

// =============================================================================
// FEATURE FLAGS
// Toggle features on/off for testing/rollout
// =============================================================================
export const FEATURES = {
  enablePremium: false,
  enableCloudSync: false,
  enableBiometric: true,
  enableExport: true,
  enableKeyboardShortcuts: true, // For web
} as const;

// =============================================================================
// ANIMATION DURATIONS
// Consistent animation timing across the app
// =============================================================================
export const ANIMATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// =============================================================================
// TIMEOUTS & DELAYS
// =============================================================================
export const TIMEOUTS = {
  debounce: 300,
  toastDuration: 3000,
  loadingMinDisplay: 500, // Minimum time to show loading state
  autoHideDelay: 5000,
} as const;
