import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet, TextStyle } from 'react-native';
import { useTheme } from '@hooks';
import type { Theme } from '@theme/types';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body' | 'bodyBold' | 'caption' | 'small';
export type TextColorVariant = 
  | 'text' 
  | 'textSecondary' 
  | 'primary' 
  | 'secondary' 
  | 'error' 
  | 'success' 
  | 'warning'
  | 'background';

export interface TextProps extends RNTextProps {
  variant?: TypographyVariant;
  color?: TextColorVariant;
  style?: TextStyle;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'text',
  style,
  children,
  ...props
}) => {
  const theme = useTheme();
  const styles = createStyles(theme, variant, color);

  return (
    <RNText style={[styles.text, style]} {...props}>
      {children}
    </RNText>
  );
};

const createStyles = (
  theme: Theme,
  variant: TypographyVariant,
  color: TextColorVariant
) =>
  StyleSheet.create({
    text: {
      ...theme.typography[variant],
      color: theme.colors[color],
    },
  });
