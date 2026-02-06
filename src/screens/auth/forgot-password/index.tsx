import React, { useState } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { useTheme } from '@hooks';
import { Input, Button } from '@components';
import { AuthLayout, AuthHeader, AuthFooter } from '../components';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@utils/validationSchemas';
import { createStyles } from './styles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const styles = createStyles(theme);

  const handleReset = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Reset password for:', values.email);
      setIsLoading(false);
      // Show success message or navigate
    }, 1500);
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
