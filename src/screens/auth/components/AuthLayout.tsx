import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from '@components';
import { useTheme } from '@hooks/useTheme';

export interface AuthLayoutProps {
  children: React.ReactNode;
  statusBarColor?: 'primary' | 'secondary' | 'background' | 'surface' | string;
  contentContainerStyle?: ViewStyle;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  statusBarColor = 'background',
  contentContainerStyle,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  // Get status bar background color
  const getStatusBarColor = (): string => {
    if (typeof statusBarColor === 'string' && !['primary', 'secondary', 'background', 'surface'].includes(statusBarColor)) {
      return statusBarColor;
    }

    switch (statusBarColor) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      case 'surface':
        return theme.colors.surface;
      case 'background':
      default:
        return theme.colors.background;
    }
  };

  const getStatusBarStyle = (): 'light-content' | 'dark-content' => {
    const bgColor = getStatusBarColor();
    const isDark = bgColor === theme.colors.background && theme.colors.background === '#000000';
    return isDark ? 'light-content' : 'dark-content';
  };

  const backgroundColor = theme.colors.background;

  return (
    <>
      <StatusBar
        backgroundColor={getStatusBarColor()}
        barStyle={getStatusBarStyle()}
      />
      <SafeAreaView
        edges={['top', 'bottom']}
        style={[styles.container, { backgroundColor }]}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          extraScrollHeight={20}
        >
          <View style={styles.content}>{children}</View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    content: {
      padding: theme.spacing.lg,
      minHeight: '100%',
    },
  });
