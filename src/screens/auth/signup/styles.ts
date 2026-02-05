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
    signupButton: {
      marginTop: theme.spacing.md,
    },
  });
