import React, { useState } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { useTheme } from '@hooks';
import { Input, Button, Text } from '@components';
import { AuthLayout, AuthHeader, AuthFooter } from '../components';
import { useForgotPasswordMutation } from '@store/auth';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@utils/validationSchemas';
import { createStyles } from './styles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();

  const handleReset = async (values: ForgotPasswordFormValues) => {
    try {
      const result = await forgotPassword({
        email: values.email,
      }).unwrap();

      setSuccessMessage(result.message || 'Password reset link sent to your email');
    } catch (err: any) {
      // Error is handled by RTK Query
      console.error('Forgot password failed:', err);
      setSuccessMessage(null);
    }
  };

  return (
    <AuthLayout statusBarColor="background">
      <AuthHeader
        title="Forgot Password?"
        subtitle="Enter your email address and we'll send you a link to reset your password."
      />

      <Formik
        initialValues={{ email: '' }}
        validationSchema={forgotPasswordSchema}
        onSubmit={handleReset}
      >
        {({ handleSubmit, isSubmitting }) => (
          <View style={styles.form}>
            <Input
              name="email"
              label="Email"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              variant="outlined"
              formik
            />

            {error && (
              <View style={styles.errorContainer}>
                <Text variant="caption" color="error" style={{ textAlign: 'center' }}>
                  {'data' in error ? (error.data as any)?.message || 'Failed to send reset link' : 'Failed to send reset link'}
                </Text>
              </View>
            )}

            {successMessage && (
              <View style={styles.successContainer}>
                <Text variant="caption" color="success" style={{ textAlign: 'center' }}>
                  {successMessage}
                </Text>
              </View>
            )}

            <Button
              title="Send Reset Link"
              variant="primary"
              onPress={handleSubmit}
              loading={isLoading || isSubmitting}
              fullWidth
              containerStyle={styles.resetButton}
            />

            <AuthFooter
              primaryText="Remember your password?"
              secondaryText="Back to Sign In"
              onSecondaryPress={() => navigation.navigate('Login')}
            />
          </View>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default ForgotPasswordScreen;
