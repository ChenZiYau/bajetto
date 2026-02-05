/**
 * Settings Screen
 * User preferences and app configuration
 */
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, useColors } from '../contexts/ThemeContext';
import { useApp } from '../contexts/AppContext';
import { APP_CONFIG } from '../config';
import { switchA11yProps, buttonA11yProps } from '../utils/accessibility';

// =============================================================================
// TYPES
// =============================================================================
interface LocalSettings {
  notifications: boolean;
  biometric: boolean;
}

// =============================================================================
// COMPONENT
// =============================================================================
export const SettingsScreen: React.FC = () => {
  const colors = useColors();
  const { themeMode, setThemeMode, isDark, toggleTheme } = useTheme();
  const { settings, updateSettings } = useApp();

  // Local UI state for settings that aren't persisted yet
  const [localSettings, setLocalSettings] = useState<LocalSettings>({
    notifications: true,
    biometric: false,
  });

  // ==========================================================================
  // HANDLERS
  // ==========================================================================
  const handleToggle = useCallback((key: keyof LocalSettings) => {
    setLocalSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleThemeToggle = useCallback(async () => {
    await toggleTheme();
  }, [toggleTheme]);

  const handleThemeModeChange = useCallback(async () => {
    // Cycle through: system -> light -> dark -> system
    const nextMode = themeMode === 'system' ? 'light' : themeMode === 'light' ? 'dark' : 'system';
    await setThemeMode(nextMode);
  }, [themeMode, setThemeMode]);

  const handleLogout = useCallback(() => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: () => console.log('Logged out') },
      ]
    );
  }, []);

  // ==========================================================================
  // RENDER HELPERS
  // ==========================================================================
  const renderSettingItem = (
    icon: string,
    title: string,
    subtitle?: string,
    type: 'toggle' | 'navigation' | 'action' = 'navigation',
    toggleValue?: boolean,
    onToggle?: () => void,
    iconColor?: string
  ) => {
    const color = iconColor || colors.primary;

    return (
      <TouchableOpacity
        style={styles.settingItem}
        activeOpacity={type === 'toggle' ? 1 : 0.7}
        onPress={type === 'navigation' ? () => {} : undefined}
        {...(type === 'navigation' ? buttonA11yProps(title, subtitle) : {})}
      >
        <View style={[styles.settingIcon, { backgroundColor: color + '20' }]}>
          <Ionicons name={icon as any} size={20} color={color} />
        </View>
        <View style={styles.settingContent}>
          <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
              {subtitle}
            </Text>
          )}
        </View>
        {type === 'toggle' && onToggle && (
          <Switch
            value={toggleValue}
            onValueChange={onToggle}
            trackColor={{
              false: colors.switchTrackOff,
              true: colors.switchTrackOn,
            }}
            thumbColor={toggleValue ? colors.switchThumbOn : colors.switchThumbOff}
            {...switchA11yProps(title, !!toggleValue, subtitle)}
          />
        )}
        {type === 'navigation' && (
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        )}
      </TouchableOpacity>
    );
  };

  const getThemeModeText = (): string => {
    switch (themeMode) {
      case 'system':
        return `System (${isDark ? 'Dark' : 'Light'})`;
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
    }
  };

  // ==========================================================================
  // STYLES (Dynamic based on theme)
  // ==========================================================================
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    profileCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
    },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.textInverse,
    },
    profileName: {
      fontSize: 17,
      fontWeight: '600',
      color: colors.textPrimary,
      marginBottom: 2,
    },
    profileEmail: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    premiumBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.warning + '15',
      borderRadius: 16,
      padding: 16,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.warning + '30',
    },
    premiumIcon: {
      width: 48,
      height: 48,
      borderRadius: 14,
      backgroundColor: colors.warning + '25',
      justifyContent: 'center',
      alignItems: 'center',
    },
    premiumTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.warning,
      marginBottom: 2,
    },
    premiumSubtitle: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 12,
      marginTop: 8,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    sectionCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      marginBottom: 16,
      overflow: 'hidden',
    },
    divider: {
      height: 1,
      backgroundColor: colors.surfaceLight,
      marginLeft: 66,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.danger + '15',
      borderRadius: 14,
      padding: 16,
      marginTop: 8,
      marginBottom: 24,
    },
    logoutText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.danger,
      marginLeft: 8,
    },
    versionText: {
      fontSize: 13,
      color: colors.textMuted,
      textAlign: 'center',
      marginBottom: 4,
    },
    copyrightText: {
      fontSize: 12,
      color: colors.textMuted,
      textAlign: 'center',
      marginBottom: 20,
    },
  });

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <SafeAreaView style={dynamicStyles.container} edges={['top']}>
      <StatusBar
        barStyle={colors.statusBarStyle}
        backgroundColor={colors.background}
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={dynamicStyles.headerTitle}>Settings</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <TouchableOpacity
          style={dynamicStyles.profileCard}
          {...buttonA11yProps('Profile', 'View and edit your profile')}
        >
          <View style={dynamicStyles.avatar}>
            <Text style={dynamicStyles.avatarText}>JD</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={dynamicStyles.profileName}>John Doe</Text>
            <Text style={dynamicStyles.profileEmail}>john.doe@email.com</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </TouchableOpacity>

        {/* Premium Banner */}
        <TouchableOpacity
          style={dynamicStyles.premiumBanner}
          {...buttonA11yProps('Upgrade to Premium', 'Unlock unlimited budgets, reports and more')}
        >
          <View style={dynamicStyles.premiumIcon}>
            <Ionicons name="diamond" size={24} color={colors.warning} />
          </View>
          <View style={styles.premiumContent}>
            <Text style={dynamicStyles.premiumTitle}>Upgrade to Premium</Text>
            <Text style={dynamicStyles.premiumSubtitle}>
              Unlock unlimited budgets, reports & more
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.warning} />
        </TouchableOpacity>

        {/* Appearance Section */}
        <Text style={dynamicStyles.sectionTitle}>Appearance</Text>
        <View style={dynamicStyles.sectionCard}>
          {renderSettingItem(
            isDark ? 'moon' : 'sunny',
            'Dark Mode',
            'Toggle dark theme',
            'toggle',
            isDark,
            handleThemeToggle,
            colors.primary
          )}
          <View style={dynamicStyles.divider} />
          {renderSettingItem(
            'color-palette',
            'Theme Mode',
            getThemeModeText(),
            'navigation',
            undefined,
            undefined,
            colors.categoryEntertainment
          )}
        </View>

        {/* Preferences Section */}
        <Text style={dynamicStyles.sectionTitle}>Preferences</Text>
        <View style={dynamicStyles.sectionCard}>
          {renderSettingItem(
            'notifications',
            'Notifications',
            'Budget alerts & reminders',
            'toggle',
            localSettings.notifications,
            () => handleToggle('notifications'),
            colors.info
          )}
          <View style={dynamicStyles.divider} />
          {renderSettingItem(
            'cash',
            'Currency',
            `${settings.currency} (${settings.currencySymbol})`,
            'navigation',
            undefined,
            undefined,
            colors.success
          )}
          <View style={dynamicStyles.divider} />
          {renderSettingItem(
            'language',
            'Language',
            'English',
            'navigation',
            undefined,
            undefined,
            colors.categoryEntertainment
          )}
        </View>

        {/* Data & Privacy Section */}
        <Text style={dynamicStyles.sectionTitle}>Data & Privacy</Text>
        <View style={dynamicStyles.sectionCard}>
          {renderSettingItem(
            'grid',
            'Categories',
            'Manage expense categories',
            'navigation',
            undefined,
            undefined,
            colors.categoryFood
          )}
          <View style={dynamicStyles.divider} />
          {renderSettingItem(
            'download',
            'Export Data',
            'Export to CSV or PDF',
            'navigation',
            undefined,
            undefined,
            colors.categoryTransport
          )}
          <View style={dynamicStyles.divider} />
          {renderSettingItem(
            'cloud-upload',
            'Backup & Sync',
            settings.autoBackup ? 'Enabled' : 'Disabled',
            'navigation',
            undefined,
            undefined,
            colors.info
          )}
          <View style={dynamicStyles.divider} />
          {renderSettingItem(
            'shield-checkmark',
            'Security',
            'PIN & biometric lock',
            'toggle',
            localSettings.biometric,
            () => handleToggle('biometric'),
            colors.success
          )}
        </View>

        {/* Support Section */}
        <Text style={dynamicStyles.sectionTitle}>Support</Text>
        <View style={dynamicStyles.sectionCard}>
          {renderSettingItem(
            'help-circle',
            'Help Center',
            'FAQs and guides',
            'navigation',
            undefined,
            undefined,
            colors.primary
          )}
          <View style={dynamicStyles.divider} />
          {renderSettingItem(
            'chatbubble-ellipses',
            'Contact Us',
            'Get in touch with support',
            'navigation',
            undefined,
            undefined,
            colors.success
          )}
          <View style={dynamicStyles.divider} />
          {renderSettingItem(
            'star',
            'Rate App',
            'Leave a review',
            'navigation',
            undefined,
            undefined,
            colors.warning
          )}
          <View style={dynamicStyles.divider} />
          {renderSettingItem(
            'share-social',
            'Share App',
            'Invite friends',
            'navigation',
            undefined,
            undefined,
            colors.categoryEntertainment
          )}
        </View>

        {/* About Section */}
        <Text style={dynamicStyles.sectionTitle}>About</Text>
        <View style={dynamicStyles.sectionCard}>
          {renderSettingItem(
            'information-circle',
            `About ${APP_CONFIG.name}`,
            `Version ${APP_CONFIG.version}`,
            'navigation',
            undefined,
            undefined,
            colors.textSecondary
          )}
          <View style={dynamicStyles.divider} />
          {renderSettingItem(
            'document-text',
            'Privacy Policy',
            undefined,
            'navigation',
            undefined,
            undefined,
            colors.textSecondary
          )}
          <View style={dynamicStyles.divider} />
          {renderSettingItem(
            'document',
            'Terms of Service',
            undefined,
            'navigation',
            undefined,
            undefined,
            colors.textSecondary
          )}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={dynamicStyles.logoutButton}
          onPress={handleLogout}
          {...buttonA11yProps('Log Out', 'Sign out of your account')}
        >
          <Ionicons name="log-out" size={20} color={colors.danger} />
          <Text style={dynamicStyles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* Version Info */}
        <Text style={dynamicStyles.versionText}>
          {APP_CONFIG.name} v{APP_CONFIG.version}
        </Text>
        <Text style={dynamicStyles.copyrightText}>
          Made with love for budgeters
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

// =============================================================================
// STATIC STYLES (Non-theme-dependent)
// =============================================================================
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 14,
  },
  premiumContent: {
    flex: 1,
    marginLeft: 14,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  settingIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
    marginLeft: 14,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
});
