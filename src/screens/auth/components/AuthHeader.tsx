import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@hooks';
import { Text } from '@components';

export interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text variant="h1" style={{ marginBottom: theme.spacing.sm, textAlign: 'center' }}>
        {title}
      </Text>
      {subtitle && (
        <Text variant="body" color="textSecondary" style={{ textAlign: 'center' }}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      marginBottom: theme.spacing.xl,
      alignItems: 'center',
    },
    title: {
      ...theme.typography.h1,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
      textAlign: 'center',
    },
    subtitle: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
  });
