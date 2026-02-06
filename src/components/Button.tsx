import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '@hooks';
import { Text } from './Text';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  loading?: boolean;
  fullWidth?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  loading = false,
  fullWidth = false,
  containerStyle,
  textStyle,
  disabled,
  ...props
}) => {
  const theme = useTheme();
  const styles = createStyles(theme, variant, fullWidth);

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isDisabled && styles.buttonDisabled,
        containerStyle,
      ]}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? theme.colors.background : theme.colors.primary}
          size="small"
        />
      ) : (
        <Text
          variant="bodyBold"
          color={variant === 'primary' || variant === 'secondary' ? 'background' : 'primary'}
          style={textStyle}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const createStyles = (
  theme: any,
  variant: 'primary' | 'secondary' | 'outline' | 'text',
  fullWidth: boolean
) =>
  StyleSheet.create({
    button: {
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 48,
      ...(fullWidth && { width: '100%' }),
      ...(variant === 'primary' && {
        backgroundColor: theme.colors.primary,
      }),
      ...(variant === 'secondary' && {
        backgroundColor: theme.colors.secondary,
      }),
      ...(variant === 'outline' && {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.primary,
      }),
      ...(variant === 'text' && {
        backgroundColor: 'transparent',
      }),
    },
    buttonDisabled: {
      opacity: 0.5,
    },
  });
