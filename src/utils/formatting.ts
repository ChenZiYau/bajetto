/**
 * Formatting Utilities
 * Centralized formatting functions for consistent display
 */

// =============================================================================
// CURRENCY FORMATTING
// =============================================================================

export interface CurrencyOptions {
  symbol?: string;
  locale?: string;
  showSign?: boolean;
  compact?: boolean;
}

/**
 * Format a number as currency
 */
export const formatCurrency = (
  amount: number,
  options: CurrencyOptions = {}
): string => {
  const {
    symbol = '$',
    locale = 'en-US',
    showSign = false,
    compact = false,
  } = options;

  const sign = showSign && amount > 0 ? '+' : '';

  if (compact) {
    if (Math.abs(amount) >= 1000000) {
      return `${sign}${symbol}${(amount / 1000000).toFixed(1)}M`;
    }
    if (Math.abs(amount) >= 1000) {
      return `${sign}${symbol}${(amount / 1000).toFixed(1)}K`;
    }
  }

  const formatted = Math.abs(amount).toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const prefix = amount < 0 ? '-' : sign;
  return `${prefix}${symbol}${formatted}`;
};

/**
 * Format amount for transaction display (with +/-)
 */
export const formatTransactionAmount = (
  amount: number,
  isExpense: boolean
): string => {
  const sign = isExpense ? '-' : '+';
  return `${sign}$${Math.abs(amount).toFixed(2)}`;
};

// =============================================================================
// DATE FORMATTING
// =============================================================================

export type DateFormat = 'relative' | 'short' | 'long' | 'full';

/**
 * Format a date string
 */
export const formatDate = (
  dateStr: string,
  format: DateFormat = 'short'
): string => {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (format === 'relative') {
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    // Fall through to short format
    format = 'short';
  }

  switch (format) {
    case 'short':
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    case 'long':
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    case 'full':
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    default:
      return date.toLocaleDateString();
  }
};

/**
 * Format a date as time
 */
export const formatTime = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

// =============================================================================
// PERCENTAGE FORMATTING
// =============================================================================

/**
 * Format a number as percentage
 */
export const formatPercentage = (
  value: number,
  decimals: number = 1
): string => {
  return `${value.toFixed(decimals)}%`;
};

// =============================================================================
// NUMBER FORMATTING
// =============================================================================

/**
 * Format large numbers compactly
 */
export const formatCompact = (value: number): string => {
  if (Math.abs(value) >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

/**
 * Format number with commas
 */
export const formatNumber = (value: number, decimals: number = 0): string => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

// =============================================================================
// TEXT FORMATTING
// =============================================================================

/**
 * Truncate text with ellipsis
 */
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
};

/**
 * Capitalize first letter
 */
export const capitalize = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Convert to title case
 */
export const toTitleCase = (text: string): string => {
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
