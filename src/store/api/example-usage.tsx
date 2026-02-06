/**
 * Example: Using RTK Query in Login Screen
 * 
 * This file shows how to replace the manual API calls with RTK Query hooks
 */

import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { useAppDispatch } from '@hooks';
import { Input, Button, Text } from '@components';
import { AuthLayout, AuthHeader, AuthFooter } from '@screens/auth/components';
import { useLoginMutation } from '@store/auth';
import { setAuth, saveTokenToKeychain } from '@store/auth';
import { loginSchema, type LoginFormValues } from '@utils/validationSchemas';

const LoginScreenExample: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // RTK Query hook - automatically handles loading, error states
  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async (values: LoginFormValues) => {
    try {
      // Call the API using RTK Query
      const result = await login({
        email: values.email,
        password: values.password,
      }).unwrap();

      // Save token to keychain
      await dispatch(saveTokenToKeychain(result.token));

      // Update auth state
      dispatch(
        setAuth({
          user: result.user,
          token: result.token,
        })
      );
    } catch (err: any) {
      // Error is automatically handled by RTK Query
      // You can access error details from the hook
      console.error('Login failed:', err);
    }
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
          <View>
            <Input
              name="email"
              label="Email"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              variant="outlined"
              formik
            />

            <Input
              name="password"
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
              autoCapitalize="none"
              variant="outlined"
              formik
            />

            {/* Error from RTK Query */}
            {error && (
              <Text variant="caption" color="error" style={{ textAlign: 'center' }}>
                {'data' in error ? (error.data as any)?.message : 'Login failed'}
              </Text>
            )}

            <Button
              title="Sign In"
              variant="primary"
              onPress={handleSubmit}
              loading={isLoading || isSubmitting}
              fullWidth
            />
          </View>
        )}
      </Formik>
    </AuthLayout>
  );
};

/**
 * Example: Using Query Hook (GET request)
 */
import { useGetProfileQuery } from '@store/main';

const ProfileScreenExample: React.FC = () => {
  // Automatically fetches on mount, handles loading/error states
  const { data, isLoading, error, refetch } = useGetProfileQuery();

  if (isLoading) {
    return <Text>Loading profile...</Text>;
  }

  if (error) {
    return <Text>Error loading profile</Text>;
  }

  return (
    <View>
      <Text variant="h2">{data?.name}</Text>
      <Text variant="body">{data?.email}</Text>
      <Button title="Refresh" onPress={() => refetch()} />
    </View>
  );
};

/**
 * Example: Using Update Mutation
 */
import { useUpdateProfileMutation } from '@store/main';

const UpdateProfileExample: React.FC = () => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleUpdate = async () => {
    try {
      const result = await updateProfile({
        name: 'New Name',
        email: 'new@email.com',
      }).unwrap();

      console.log('Profile updated:', result);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <Button
      title="Update Profile"
      onPress={handleUpdate}
      loading={isLoading}
    />
  );
};
