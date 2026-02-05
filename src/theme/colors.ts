/**
 * Theme Color System
 * Semantic color tokens that adapt to light/dark mode
 */

// =============================================================================
// BASE COLOR PALETTE
// Raw color values used to build themes
// =============================================================================
const palette = {
  // Indigo (Primary)
  indigo50: '#EEF2FF',
  indigo100: '#E0E7FF',
  indigo200: '#C7D2FE',
  indigo300: '#A5B4FC',
  indigo400: '#818CF8',
  indigo500: '#6366F1',
  indigo600: '#4F46E5',
  indigo700: '#4338CA',

  // Gray (Neutrals)
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  // Dark Mode Specific
  dark50: '#18182B',
  dark100: '#1A1A2E',
  dark200: '#252542',
  dark300: '#2D2D4A',
  dark400: '#0F0F1A',

  // Semantic Colors
  green400: '#34D399',
  green500: '#10B981',
  green600: '#059669',

  red400: '#F87171',
  red500: '#EF4444',
  red600: '#DC2626',

  yellow400: '#FBBF24',
  yellow500: '#F59E0B',
  yellow600: '#D97706',

  blue400: '#60A5FA',
  blue500: '#3B82F6',
  blue600: '#2563EB',

  cyan500: '#06B6D4',
  purple500: '#8B5CF6',
  pink500: '#EC4899',
  orange500: '#F97316',

  // Pure
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

// =============================================================================
// DARK THEME
// =============================================================================
export const darkTheme = {
  // Primary
  primary: palette.indigo500,
  primaryLight: palette.indigo400,
  primaryDark: palette.indigo600,

  // Backgrounds
  background: palette.dark400,
  surface: palette.dark100,
  surfaceLight: palette.dark200,
  surfaceElevated: palette.dark300,

  // Text
  textPrimary: palette.white,
  textSecondary: palette.gray400,
  textMuted: palette.gray500,
  textInverse: palette.gray900,

  // Semantic
  success: palette.green500,
  successLight: palette.green400,
  warning: palette.yellow500,
  warningLight: palette.yellow400,
  danger: palette.red500,
  dangerLight: palette.red400,
  info: palette.blue500,

  // Category Colors
  categoryFood: palette.orange500,
  categoryTransport: palette.blue500,
  categoryShopping: palette.pink500,
  categoryEntertainment: palette.purple500,
  categoryBills: palette.red500,
  categoryHealth: palette.green500,
  categoryEducation: palette.cyan500,
  categoryOther: palette.gray500,

  // Border
  border: palette.gray700,
  borderLight: palette.gray600,

  // Income/Expense
  income: palette.green500,
  expense: palette.red500,

  // Status Bar
  statusBarStyle: 'light-content' as const,

  // Card specific (aliases for backward compatibility)
  cardBackground: palette.dark100,
  cardBackgroundLight: palette.dark200,

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Switch
  switchTrackOff: palette.dark200,
  switchTrackOn: palette.indigo500 + '60',
  switchThumbOff: palette.gray500,
  switchThumbOn: palette.indigo500,
} as const;

// =============================================================================
// LIGHT THEME
// =============================================================================
export const lightTheme = {
  // Primary
  primary: palette.indigo500,
  primaryLight: palette.indigo400,
  primaryDark: palette.indigo600,

  // Backgrounds
  background: palette.gray50,
  surface: palette.white,
  surfaceLight: palette.gray100,
  surfaceElevated: palette.white,

  // Text
  textPrimary: palette.gray900,
  textSecondary: palette.gray600,
  textMuted: palette.gray400,
  textInverse: palette.white,

  // Semantic
  success: palette.green600,
  successLight: palette.green500,
  warning: palette.yellow600,
  warningLight: palette.yellow500,
  danger: palette.red600,
  dangerLight: palette.red500,
  info: palette.blue600,

  // Category Colors
  categoryFood: palette.orange500,
  categoryTransport: palette.blue600,
  categoryShopping: palette.pink500,
  categoryEntertainment: palette.purple500,
  categoryBills: palette.red600,
  categoryHealth: palette.green600,
  categoryEducation: palette.cyan500,
  categoryOther: palette.gray500,

  // Border
  border: palette.gray200,
  borderLight: palette.gray300,

  // Income/Expense
  income: palette.green600,
  expense: palette.red600,

  // Status Bar
  statusBarStyle: 'dark-content' as const,

  // Card specific (aliases for backward compatibility)
  cardBackground: palette.white,
  cardBackgroundLight: palette.gray100,

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.3)',

  // Switch
  switchTrackOff: palette.gray200,
  switchTrackOn: palette.indigo500 + '60',
  switchThumbOff: palette.gray400,
  switchThumbOn: palette.indigo500,
} as const;

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================
export interface Theme {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  background: string;
  surface: string;
  surfaceLight: string;
  surfaceElevated: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  danger: string;
  dangerLight: string;
  info: string;
  categoryFood: string;
  categoryTransport: string;
  categoryShopping: string;
  categoryEntertainment: string;
  categoryBills: string;
  categoryHealth: string;
  categoryEducation: string;
  categoryOther: string;
  border: string;
  borderLight: string;
  income: string;
  expense: string;
  statusBarStyle: 'light-content' | 'dark-content';
  cardBackground: string;
  cardBackgroundLight: string;
  overlay: string;
  switchTrackOff: string;
  switchTrackOn: string;
  switchThumbOff: string;
  switchThumbOn: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

// =============================================================================
// DEFAULT EXPORT (backward compatibility - defaults to dark)
// =============================================================================
export const colors = darkTheme;

// =============================================================================
// SHADOWS
// =============================================================================
export const shadows = {
  small: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
  },
  large: {
    shadowColor: palette.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Add alpha transparency to a hex color
 * @param color - Hex color string
 * @param alpha - Alpha value (0-100)
 */
export const withAlpha = (color: string, alpha: number): string => {
  const alphaHex = Math.round((alpha / 100) * 255)
    .toString(16)
    .padStart(2, '0');
  return `${color}${alphaHex}`;
};

/**
 * Get theme by mode
 */
export const getTheme = (mode: 'light' | 'dark'): Theme => {
  return mode === 'light' ? lightTheme : darkTheme;
};
