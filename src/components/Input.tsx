import React from 'react';
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  Text,
  ViewStyle,
} from 'react-native';
import { useField } from 'formik';
import { useTheme } from '@hooks';

export interface InputProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  name?: string; // For Formik integration
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  variant?: 'default' | 'outlined' | 'filled';
  // Formik props (will be used if name is provided)
  formik?: boolean;
}

export const Input: React.FC<InputProps> = ({
  name,
  label,
  error: errorProp,
  containerStyle,
  variant = 'default',
  style,
  formik = false,
  ...props
}) => {
  const theme = useTheme();
  const styles = createStyles(theme, variant);

  // Use Formik field if name is provided
  const [field, meta, helpers] = useField(name || '');
  const hasFormik = formik && name;

  const value = hasFormik ? field.value : props.value;
  const onChangeText = hasFormik
    ? (text: string) => helpers.setValue(text)
    : props.onChangeText;
  const error = errorProp || (hasFormik && meta.touched && meta.error ? meta.error : undefined);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        {...props}
        value={value}
        onChangeText={onChangeText}
        onBlur={hasFormik ? field.onBlur : props.onBlur}
        style={[
          styles.input,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={theme.colors.textSecondary}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const createStyles = (theme: any, variant: 'default' | 'outlined' | 'filled') =>
  StyleSheet.create({
    container: {
      marginBottom: theme.spacing.md,
    },
    label: {
      ...theme.typography.caption,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
      fontWeight: '600',
    },
    input: {
      ...theme.typography.body,
      color: theme.colors.text,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      borderWidth: variant === 'outlined' ? 1 : 0,
      borderColor: theme.colors.border,
      backgroundColor:
        variant === 'filled'
          ? theme.colors.surface
          : variant === 'outlined'
          ? 'transparent'
          : theme.colors.surface,
    },
    inputError: {
      borderColor: theme.colors.error,
      borderWidth: 1,
    },
    errorText: {
      ...theme.typography.caption,
      color: theme.colors.error,
      marginTop: theme.spacing.xs,
    },
  });
