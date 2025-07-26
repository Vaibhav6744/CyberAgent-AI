import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#162456',    // Material Blue
  secondary: '#193cb8',  // Darker Blue
  accent: '#64B5F6',     // Light Blue
  background: '#101824',  // Dark background
  backgroundAlt: '#162133',  // Alternative dark background
  text: '#e3e3e3',       // Light text
  grey: '#90CAF9',       // Light Blue Grey
  card: '#193cb8',       // Card background
  success: '#4CAF50',    // Green
  warning: '#FF9800',    // Orange
  error: '#F44336',      // Red
  info: '#2196F3',       // Blue
};

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.backgroundAlt,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    maxWidth: 800,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
  card: {
    backgroundColor: colors.backgroundAlt,
    borderColor: colors.accent,
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    elevation: 4,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: colors.text,
  },
  // Animation styles
  fadeIn: {
    opacity: 1,
  },
  fadeOut: {
    opacity: 0,
  },
  // Status indicators
  statusActive: {
    color: colors.success,
  },
  statusWarning: {
    color: colors.warning,
  },
  statusError: {
    color: colors.error,
  },
  statusInfo: {
    color: colors.info,
  },
});