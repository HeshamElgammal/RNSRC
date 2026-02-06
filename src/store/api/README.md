# RTK Query API Setup

This directory contains the RTK Query API configuration for making API calls.

## Files

- `baseQuery.ts` - Base query configuration with headers (Content-Type, Accept-Language, Authorization)
- `apiSlice.ts` - API slice with all endpoints and hooks
- `index.ts` - Exports

## Usage Example

### Using Mutations (POST, PUT, DELETE)

```typescript
import { useLoginMutation } from '@store/api';

const LoginScreen = () => {
  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const result = await login({
        email: 'user@example.com',
        password: 'password123',
      }).unwrap();
      
      // Handle success
      console.log('Login successful:', result);
    } catch (err) {
      // Handle error
      console.error('Login failed:', err);
    }
  };

  return (
    <Button
      title="Login"
      onPress={handleLogin}
      loading={isLoading}
    />
  );
};
```

### Using Queries (GET)

```typescript
import { useGetProfileQuery } from '@store/api';

const ProfileScreen = () => {
  const { data, isLoading, error, refetch } = useGetProfileQuery();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading profile</Text>;

  return (
    <View>
      <Text>{data?.name}</Text>
      <Text>{data?.email}</Text>
    </View>
  );
};
```

## Available Hooks

### Auth
- `useLoginMutation()` - Login user
- `useSignupMutation()` - Sign up user
- `useForgotPasswordMutation()` - Request password reset
- `useResetPasswordMutation()` - Reset password
- `useLogoutMutation()` - Logout user

### User
- `useGetProfileQuery()` - Get user profile
- `useUpdateProfileMutation()` - Update user profile

## Features

- ✅ Automatic token injection in headers
- ✅ Language header from app state
- ✅ TypeScript support
- ✅ Automatic caching and invalidation
- ✅ Loading and error states
