import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { useTheme } from '@hooks/useTheme';
import { Input, Button } from '@components';
import { AuthLayout, AuthHeader, AuthFooter } from '../components';
import { signupSchema, type SignupFormValues } from '@utils/validationSchemas';
import { createStyles } from './styles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = React.useState(false);
  const styles = createStyles(theme);

  const handleSignup = async (values: SignupFormValues) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Signup:', values);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AuthLayout statusBarColor="background">
      <AuthHeader
        title="Create Account"
        subtitle="Sign up to get started"
      />

      <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={signupSchema}
        onSubmit={handleSignup}
      >
        {({ handleSubmit, isSubmitting }) => (
          <View style={styles.form}>
            <Input
              name="name"
              label="Full Name"
              placeholder="Enter your full name"
              autoCapitalize="words"
              variant="outlined"
              formik
            />

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
              autoComplete="password-new"
              variant="outlined"
              formik
            />

            <Input
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              secureTextEntry
              autoCapitalize="none"
              variant="outlined"
              formik
            />

            <Button
              title="Sign Up"
              variant="primary"
              onPress={handleSubmit}
              loading={isLoading || isSubmitting}
              fullWidth
              containerStyle={styles.signupButton}
            />

            <AuthFooter
              primaryText="Already have an account?"
              secondaryText="Sign In"
              onSecondaryPress={() => navigation.navigate('Login')}
            />
          </View>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default SignupScreen;
