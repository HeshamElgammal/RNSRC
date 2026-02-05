import { StyleSheet } from 'react-native';
import { Theme } from '@theme/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    form: {
      width: '100%',
    },
    errorContainer: {
      marginBottom: theme.spacing.md,
    },
    errorText: {
      ...theme.typography.caption,
      color: theme.colors.error,
      textAlign: 'center',
    },
    loginButton: {
      marginTop: theme.spacing.md,
    },
  });
