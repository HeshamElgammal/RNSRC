import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks';
import { Button } from '@components';

export interface AuthFooterProps {
  primaryText: string;
  secondaryText: string;
  onSecondaryPress: () => void;
  showForgotPassword?: boolean;
  onForgotPasswordPress?: () => void;
}

export const AuthFooter: React.FC<AuthFooterProps> = ({
  primaryText,
  secondaryText,
  onSecondaryPress,
  showForgotPassword = false,
  onForgotPasswordPress,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {showForgotPassword && onForgotPasswordPress && (
        <Button
          title="Forgot Password?"
          variant="text"
          onPress={onForgotPasswordPress}
          containerStyle={styles.forgotButton}
        />
      )}

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>{primaryText} </Text>
        <Button
          title={secondaryText}
          variant="text"
          onPress={onSecondaryPress}
        />
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      marginTop: theme.spacing.xl,
    },
    forgotButton: {
      marginBottom: theme.spacing.md,
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    footerText: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
    },
  });
