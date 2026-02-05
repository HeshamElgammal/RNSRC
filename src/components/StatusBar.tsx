import React from 'react';
import { StatusBar as RNStatusBar, StatusBarStyle, Platform } from 'react-native';
import { useTheme } from '@hooks/useTheme';

export interface StatusBarProps {
  backgroundColor?: string;
  barStyle?: StatusBarStyle;
  translucent?: boolean;
  hidden?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  backgroundColor,
  barStyle,
  translucent = false,
  hidden = false,
}) => {
  const theme = useTheme();

  // Determine bar style based on theme if not provided
  const defaultBarStyle: StatusBarStyle =
    theme.colors.background === '#FFFFFF' || theme.colors.background === '#000000'
      ? theme.colors.background === '#FFFFFF'
        ? 'dark-content'
        : 'light-content'
      : 'light-content';

  const finalBarStyle = barStyle || defaultBarStyle;

  if (Platform.OS === 'android') {
    return (
      <RNStatusBar
        backgroundColor={backgroundColor || theme.colors.background}
        barStyle={finalBarStyle}
        translucent={translucent}
        hidden={hidden}
      />
    );
  }

  // iOS
  return (
    <RNStatusBar
      barStyle={finalBarStyle}
      hidden={hidden}
    />
  );
};
