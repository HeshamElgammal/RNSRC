import React from 'react';
import { View, Text } from 'react-native';
import { Formik } from 'formik';
import { useAppDispatch, useAppSelector } from '@hooks';
import { useTheme } from '@hooks/useTheme';
import { Input, Button } from '@components';
import { AuthLayout, AuthHeader, AuthFooter } from '../components';
import {
  loginSuccess,
  setLoading,
  setError,
  saveTokenToKeychain,
} from '@store/slices/authSlice';
import { loginSchema, type LoginFormValues } from '@utils/validationSchemas';
import { createStyles } from './styles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const error = useAppSelector((state) => state.auth.error);
  const styles = createStyles(theme);

  const handleLogin = async (values: LoginFormValues) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    // Simulate API call
    setTimeout(async () => {
      const token = 'mock-token-123';
      
      // Save token to keychain
      await dispatch(saveTokenToKeychain(token));
      
      dispatch(
        loginSuccess({
          user: {
            id: '1',
            email: values.email,
            name: 'John Doe',
          },
          token,
        })
      );
      dispatch(setLoading(false));
    }, 1500);
  };

  return (
    <AuthLayout statusBarColor="background">
      <AuthHeader
        title="Welcome Back"
        subtitle="Sign in to continue"
      />

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
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

            <Input
              name="password"
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              variant="outlined"
              formik
            />

            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <Button
              title="Sign In"
              variant="primary"
              onPress={handleSubmit}
              loading={isLoading || isSubmitting}
              fullWidth
              containerStyle={styles.loginButton}
            />

            <AuthFooter
              primaryText="Don't have an account?"
              secondaryText="Sign Up"
              onSecondaryPress={() => navigation.navigate('Signup')}
              showForgotPassword
              onForgotPasswordPress={() => navigation.navigate('ForgotPassword')}
            />
          </View>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default LoginScreen;
