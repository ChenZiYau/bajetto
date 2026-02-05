/**
 * Accessibility Utilities
 * Helpers for keyboard navigation and screen reader support
 */
import { Platform, AccessibilityInfo } from 'react-native';
import { KEYBOARD_SHORTCUTS, ShortcutKey, ShortcutAction } from '../config';

import { AccessibilityRole, AccessibilityState } from 'react-native';

// =============================================================================
// TYPES
// =============================================================================
export interface A11yProps {
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;
  accessibilityState?: AccessibilityState;
}

// =============================================================================
// ACCESSIBILITY PROPS HELPERS
// =============================================================================

/**
 * Generate accessibility props for a button
 */
export const buttonA11yProps = (
  label: string,
  hint?: string,
  disabled?: boolean
): A11yProps => ({
  accessible: true,
  accessibilityLabel: label,
  accessibilityHint: hint,
  accessibilityRole: 'button' as AccessibilityRole,
  accessibilityState: { disabled: !!disabled },
});

/**
 * Generate accessibility props for a link
 */
export const linkA11yProps = (label: string, hint?: string): A11yProps => ({
  accessible: true,
  accessibilityLabel: label,
  accessibilityHint: hint || `Navigates to ${label}`,
  accessibilityRole: 'link' as AccessibilityRole,
});

/**
 * Generate accessibility props for an image
 */
export const imageA11yProps = (description: string): A11yProps => ({
  accessible: true,
  accessibilityLabel: description,
  accessibilityRole: 'image' as AccessibilityRole,
});

/**
 * Generate accessibility props for a header
 */
export const headerA11yProps = (text: string): A11yProps => ({
  accessible: true,
  accessibilityLabel: text,
  accessibilityRole: 'header' as AccessibilityRole,
});

/**
 * Generate accessibility props for a toggle/switch
 */
export const switchA11yProps = (
  label: string,
  checked: boolean,
  hint?: string
): A11yProps => ({
  accessible: true,
  accessibilityLabel: label,
  accessibilityHint: hint || `Double tap to ${checked ? 'disable' : 'enable'}`,
  accessibilityRole: 'switch' as AccessibilityRole,
  accessibilityState: { checked },
});

/**
 * Generate accessibility props for a text input
 */
export const inputA11yProps = (
  label: string,
  hint?: string,
  error?: string
): A11yProps => ({
  accessible: true,
  accessibilityLabel: error ? `${label}, Error: ${error}` : label,
  accessibilityHint: hint,
  accessibilityRole: 'none' as AccessibilityRole,
});

// =============================================================================
// KEYBOARD SHORTCUTS (Web Only)
// =============================================================================

type ShortcutHandler = (action: ShortcutAction) => void;

/**
 * Parse keyboard event to shortcut key format
 */
const parseKeyEvent = (event: KeyboardEvent): string => {
  const parts: string[] = [];
  if (event.altKey) parts.push('Alt');
  if (event.ctrlKey) parts.push('Ctrl');
  if (event.shiftKey) parts.push('Shift');
  if (event.metaKey) parts.push('Meta');

  // Normalize key
  let key = event.key;
  if (key === 'Escape') key = 'Escape';
  else if (key === '/') key = '/';
  else key = key.toUpperCase();

  parts.push(key);
  return parts.join('+');
};

/**
 * Setup keyboard shortcut listeners (Web only)
 * Returns cleanup function
 */
export const setupKeyboardShortcuts = (
  handler: ShortcutHandler
): (() => void) => {
  // Only works on web
  if (Platform.OS !== 'web') {
    return () => {};
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    const shortcutKey = parseKeyEvent(event);

    // Check if this is a registered shortcut
    if (shortcutKey in KEYBOARD_SHORTCUTS) {
      const shortcut = KEYBOARD_SHORTCUTS[shortcutKey as ShortcutKey];
      event.preventDefault();
      handler(shortcut.action);
    }
  };

  // Type assertion needed for web
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeyDown as any);
    return () => window.removeEventListener('keydown', handleKeyDown as any);
  }

  return () => {};
};

/**
 * Get formatted list of keyboard shortcuts for display
 */
export const getShortcutsList = (): Array<{
  key: string;
  description: string;
}> => {
  return Object.entries(KEYBOARD_SHORTCUTS).map(([key, value]) => ({
    key,
    description: value.description,
  }));
};

// =============================================================================
// SCREEN READER UTILITIES
// =============================================================================

/**
 * Announce message to screen reader
 */
export const announceForAccessibility = (message: string): void => {
  AccessibilityInfo.announceForAccessibility(message);
};

/**
 * Check if screen reader is enabled
 */
export const isScreenReaderEnabled = async (): Promise<boolean> => {
  return AccessibilityInfo.isScreenReaderEnabled();
};

// =============================================================================
// FOCUS MANAGEMENT
// =============================================================================

/**
 * Check if reduce motion is enabled
 */
export const isReduceMotionEnabled = async (): Promise<boolean> => {
  return AccessibilityInfo.isReduceMotionEnabled();
};
