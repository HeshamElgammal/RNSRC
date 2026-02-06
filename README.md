# React Native Starter Template

A comprehensive, production-ready React Native starter template with Redux Toolkit, React Navigation, TypeScript, and New Architecture support (RN 0.83+).

## 🚀 Features

- ✅ **React Native 0.83** with New Architecture support
- ✅ **Redux Toolkit** for state management with MMKV persistence
- ✅ **React Navigation v7** with TypeScript support
- ✅ **TypeScript** throughout the codebase
- ✅ **Theme System** with light/dark mode support
- ✅ **Custom Hooks** for common operations
- ✅ **Reusable Components** (Input, Button, Container, StatusBar)
- ✅ **Formik + Yup** for form management and validation
- ✅ **MMKV Storage** for fast, synchronous storage
- ✅ **Keychain** for secure token storage
- ✅ **Auth Flow** (Login, Signup, Forgot Password)
- ✅ **Home Screen** with example implementation
- ✅ **Utility Functions** (storage, validation)
- ✅ **Best Practices** folder structure

## 📦 Required Dependencies

When initializing a new React Native app, make sure to install these dependencies:

```bash
npm install @react-navigation/native @react-navigation/native-stack @reduxjs/toolkit react-redux redux-persist react-native-gesture-handler react-native-keychain react-native-mmkv react-native-reanimated react-native-safe-area-context react-native-screens formik yup
```

Or with yarn:

```bash
yarn add @react-navigation/native @react-navigation/native-stack @reduxjs/toolkit react-redux redux-persist react-native-gesture-handler react-native-keychain react-native-mmkv react-native-reanimated react-native-safe-area-context react-native-screens formik yup
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Input.tsx       # Input component with variants (Formik support)
│   ├── Button.tsx      # Button component (primary/secondary/outline/text)
│   ├── Container.tsx  # Screen container with StatusBar integration
│   ├── StatusBar.tsx  # StatusBar component with theme support
│   └── index.ts
├── constants/           # App constants (API endpoints, storage keys, etc.)
├── hooks/              # Custom React hooks
│   ├── useAuth.ts      # Authentication hook
│   ├── useTheme.ts     # Theme hook
│   └── redux.ts        # Redux typed hooks
├── navigation/          # Navigation configuration
│   ├── RootNavigator.tsx
│   ├── AuthNavigator.tsx
│   ├── MainNavigator.tsx
│   └── types.ts        # Navigation types
├── screens/             # Screen components
│   ├── auth/           # Authentication screens
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   └── ForgotPasswordScreen.tsx
│   └── main/           # Main app screens
│       ├── HomeScreen.tsx
│       ├── ProfileScreen.tsx
│       └── SettingsScreen.tsx
├── store/              # Redux store configuration
│   ├── index.ts        # Store setup with MMKV
│   └── slices/         # Redux slices
│       ├── authSlice.ts
│       └── appSlice.ts
├── theme/              # Theme configuration
│   ├── index.ts        # Theme definitions
│   └── types.ts        # Theme types
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
│   ├── storage.ts      # MMKV storage helpers
│   ├── keychain.ts     # Keychain helpers for secure token storage
│   ├── validation.ts   # Validation helpers
│   └── validationSchemas.ts # Yup validation schemas
└── index.ts            # Main entry point (optional)
```

## 🛠️ Setup Instructions

### 1. Initialize React Native App

```bash
npx react-native@latest init YourAppName --version 0.83.0
cd YourAppName
```

### 2. Install Dependencies

```bash
npm install @react-navigation/native @react-navigation/native-stack @reduxjs/toolkit react-redux redux-persist react-native-gesture-handler react-native-keychain react-native-mmkv react-native-reanimated react-native-safe-area-context react-native-screens formik yup
```

**Note:** For iOS, you'll need to run `pod install` after installing dependencies.

### 3. Copy Source Files

Copy the entire `src/` folder from this template to your new React Native project:

```bash
cp -r /path/to/RNLibs/src ./src
```

### 4. Configure TypeScript Paths

Add path aliases to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@screens/*": ["src/screens/*"],
      "@navigation/*": ["src/navigation/*"],
      "@store/*": ["src/store/*"],
      "@hooks/*": ["src/hooks/*"],
      "@theme/*": ["src/theme/*"],
      "@utils/*": ["src/utils/*"],
      "@constants/*": ["src/constants/*"],
      "@types/*": ["src/types/*"]
    }
  }
}
```

### 5. Configure Babel

Update `babel.config.js` to include Reanimated plugin:

```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
  ],
};
```

### 6. Update App.tsx

Replace your `App.tsx` with:

```typescript
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import { RootNavigator } from './src/navigation';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
```

### 7. iOS Setup (if needed)

For iOS, you may need to install pods:

```bash
cd ios && pod install && cd ..
```

### 8. Android Setup

Make sure your `android/gradle.properties` includes:

```properties
newArchEnabled=true
```

## 🎨 Usage Examples

### Using Components

#### Container Component

```typescript
import { Container } from '@components';

const MyScreen = () => {
  return (
    <Container
      statusBarColor="primary" // 'primary' | 'secondary' | 'background' | 'surface' | custom color
      scrollable
      keyboardAvoiding
      contentContainerStyle={{ padding: 16 }}
    >
      {/* Your content */}
    </Container>
  );
};
```

#### Input Component (with Formik)

```typescript
import { Input } from '@components';
import { Formik } from 'formik';
import { loginSchema } from '@utils/validationSchemas';

const MyForm = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <View>
          <Input
            name="email"
            label="Email"
            placeholder="Enter your email"
            variant="outlined" // 'default' | 'outlined' | 'filled'
            formik // Enable Formik integration
          />
          
          <Input
            name="password"
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            variant="outlined"
            formik
          />
          
          <Button
            title="Submit"
            variant="primary" // 'primary' | 'secondary' | 'outline' | 'text'
            onPress={handleSubmit}
            loading={isLoading}
            fullWidth
          />
        </View>
      )}
    </Formik>
  );
};
```

#### Button Component

```typescript
import { Button } from '@components';

const MyComponent = () => {
  return (
    <View>
      <Button
        title="Primary Button"
        variant="primary"
        onPress={handlePress}
        loading={isLoading}
        fullWidth
      />
      
      <Button
        title="Secondary Button"
        variant="secondary"
        onPress={handlePress}
      />
      
      <Button
        title="Outline Button"
        variant="outline"
        onPress={handlePress}
      />
      
      <Button
        title="Text Button"
        variant="text"
        onPress={handlePress}
      />
    </View>
  );
};
```

### Using the Theme Hook

```typescript
import { useTheme } from '@hooks/useTheme';

const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>
        Hello World
      </Text>
    </View>
  );
};
```

### Using the Auth Hook

```typescript
import { useAuth } from '@hooks';

const MyComponent = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <Text>Please login</Text>;
  }
  
  return (
    <View>
      <Text>Welcome, {user?.name}</Text>
      <Button onPress={logout} title="Logout" />
    </View>
  );
};
```

### Using Redux

```typescript
import { useAppDispatch, useAppSelector } from '@hooks';
import { toggleTheme } from '@store/slices/appSlice';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.app.theme);
  
  return (
    <Button
      title={`Current: ${theme}`}
      variant="primary"
      onPress={() => dispatch(toggleTheme())}
    />
  );
};
```

### Using Storage (MMKV)

```typescript
import { mmkvStorage } from '@utils/storage';

// Synchronous operations (MMKV advantage)
mmkvStorage.setItem('key', { data: 'value' });
const value = mmkvStorage.getItem('key');
mmkvStorage.removeItem('key');
```

### Using Keychain for Secure Token Storage

```typescript
import { keychain } from '@utils/keychain';

// Store token securely
await keychain.setToken('your-auth-token');

// Retrieve token
const token = await keychain.getToken();

// Remove token
await keychain.removeToken();
```

### Using Formik + Yup for Forms

```typescript
import { Formik } from 'formik';
import { Input, Button } from '@components';
import { loginSchema, type LoginFormValues } from '@utils/validationSchemas';

const LoginForm = () => {
  const handleSubmit = async (values: LoginFormValues) => {
    // Handle form submission
    console.log(values);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, isSubmitting }) => (
        <View>
          <Input
            name="email"
            label="Email"
            formik
            variant="outlined"
          />
          <Input
            name="password"
            label="Password"
            secureTextEntry
            formik
            variant="outlined"
          />
          <Button
            title="Submit"
            onPress={handleSubmit}
            loading={isSubmitting}
            variant="primary"
          />
        </View>
      )}
    </Formik>
  );
};
```

## 🔧 Customization

### Adding New Screens

1. Create screen in `src/screens/`
2. Add route to appropriate navigator in `src/navigation/`
3. Update navigation types in `src/navigation/types.ts`

### Adding New Redux Slices

1. Create slice in `src/store/slices/`
2. Add reducer to `src/store/index.ts`
3. Use typed hooks from `src/hooks/redux.ts`

### Customizing Theme

Edit `src/theme/index.ts` to customize colors, typography, spacing, etc.

## 📝 Notes

- This template uses React Native 0.83 with New Architecture enabled
- All navigation is typed with TypeScript
- Redux state is persisted using **MMKV** (faster than AsyncStorage, synchronous)
- **Keychain** is used for secure token storage (tokens are stored in device keychain)
- Theme system supports light/dark mode
- **Formik + Yup** for form management and validation
- Reusable **Input**, **Button**, **Container**, and **StatusBar** components
- **Container** component automatically handles StatusBar, SafeArea, scrolling, and keyboard avoiding
- StatusBar color can be set to `primary`, `secondary`, `background`, `surface`, or a custom color
- Auth flow is implemented but needs backend integration
- MMKV provides synchronous storage operations (no async/await needed for basic operations)

## 🤝 Contributing

Feel free to extend this template with additional features:
- API service layer
- Error boundary
- Loading states
- Toast notifications
- Image picker
- Push notifications
- And more!

## 📄 License

This template is free to use and modify for your projects.
