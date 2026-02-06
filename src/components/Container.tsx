import React from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ScrollViewProps,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@hooks';
import { StatusBar, StatusBarProps } from './StatusBar';

export interface ContainerProps {
  children: React.ReactNode;
  backgroundColor?: string;
  statusBarColor?: 'primary' | 'secondary' | 'background' | 'surface' | string;
  statusBarStyle?: StatusBarProps['barStyle'];
  safeArea?: boolean;
  safeAreaEdges?: ('top' | 'bottom' | 'left' | 'right')[];
  scrollable?: boolean;
  scrollViewProps?: ScrollViewProps;
  keyboardAvoiding?: boolean;
  keyboardAvoidingBehavior?: 'padding' | 'height' | 'position';
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  backgroundColor,
  statusBarColor = 'background',
  statusBarStyle,
  safeArea = true,
  safeAreaEdges = ['top', 'bottom'],
  scrollable = false,
  scrollViewProps,
  keyboardAvoiding = false,
  keyboardAvoidingBehavior = Platform.OS === 'ios' ? 'padding' : 'height',
  style,
  contentContainerStyle,
}) => {
  const theme = useTheme();

  // Get status bar background color
  const getStatusBarColor = (): string => {
    if (typeof statusBarColor === 'string' && !['primary', 'secondary', 'background', 'surface'].includes(statusBarColor)) {
      return statusBarColor; // Custom color
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

  // Determine status bar style based on background color
  const getStatusBarStyle = (): StatusBarProps['barStyle'] => {
    if (statusBarStyle) return statusBarStyle;

    const bgColor = getStatusBarColor();
    // Simple heuristic: if color is dark, use light content, otherwise dark content
    const isDark = bgColor === theme.colors.background && theme.colors.background === '#000000';
    return isDark ? 'light-content' : 'dark-content';
  };

  const containerBackgroundColor = backgroundColor || theme.colors.background;
  const styles = createStyles(containerBackgroundColor);

  const content = (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );

  const scrollableContent = scrollable ? (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.container, style, contentContainerStyle]}>
      {children}
    </View>
  );

  const wrappedContent = keyboardAvoiding ? (
    <KeyboardAvoidingView
      behavior={keyboardAvoidingBehavior}
      style={styles.flex}
    >
      {scrollableContent}
    </KeyboardAvoidingView>
  ) : (
    scrollableContent
  );

  if (safeArea) {
    return (
      <>
        <StatusBar
          backgroundColor={getStatusBarColor()}
          barStyle={getStatusBarStyle()}
        />
        <SafeAreaView
          edges={safeAreaEdges}
          style={[styles.flex, { backgroundColor: containerBackgroundColor }]}
        >
          {wrappedContent}
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <StatusBar
        backgroundColor={getStatusBarColor()}
        barStyle={getStatusBarStyle()}
      />
      {wrappedContent}
    </>
  );
};

const createStyles = (backgroundColor: string) =>
  StyleSheet.create({
    flex: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor,
    },
    contentContainer: {
      flexGrow: 1,
    },
  });
