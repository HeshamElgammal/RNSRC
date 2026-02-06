import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@hooks';
import { useAuth } from '@hooks';
import { useAppDispatch } from '@hooks';
import { Container, Button, Text } from '@components';
import { toggleTheme } from '@store/main';
import { createStyles } from './styles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<MainStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const dispatch = useAppDispatch();
  const styles = createStyles(theme);

  return (
    <Container
      statusBarColor="primary"
      scrollable
      contentContainerStyle={styles.content}
    >
      <Text variant="h2" style={{ marginBottom: theme.spacing.xs }}>
        Welcome, {user?.name || 'User'}!
      </Text>
      <Text variant="body" color="textSecondary" style={{ marginBottom: theme.spacing.xl }}>
        {user?.email}
      </Text>

      <View style={styles.card}>
        <Text variant="h3" style={{ marginBottom: theme.spacing.md }}>
          Quick Actions
        </Text>
        
        <Button
          title="View Profile"
          variant="primary"
          onPress={() => navigation.navigate('Profile')}
          fullWidth
          containerStyle={styles.actionButton}
        />

        <Button
          title="Settings"
          variant="primary"
          onPress={() => navigation.navigate('Settings')}
          fullWidth
          containerStyle={styles.actionButton}
        />

        <Button
          title="Toggle Theme"
          variant="secondary"
          onPress={() => dispatch(toggleTheme())}
          fullWidth
          containerStyle={styles.actionButton}
        />

        <Button
          title="Logout"
          variant="outline"
          onPress={logout}
          fullWidth
          containerStyle={[styles.actionButton, styles.logoutButton]}
        />
      </View>

      <View style={styles.infoCard}>
        <Text variant="h3" style={{ marginBottom: theme.spacing.md }}>
          App Information
        </Text>
        <Text variant="body" style={{ marginBottom: theme.spacing.sm }}>
          This is a React Native starter template with:
        </Text>
        <Text variant="body" color="textSecondary" style={{ marginBottom: theme.spacing.xs }}>
          • Redux Toolkit for state management
        </Text>
        <Text variant="body" color="textSecondary" style={{ marginBottom: theme.spacing.xs }}>
          • React Navigation v7
        </Text>
        <Text variant="body" color="textSecondary" style={{ marginBottom: theme.spacing.xs }}>
          • TypeScript support
        </Text>
        <Text variant="body" color="textSecondary" style={{ marginBottom: theme.spacing.xs }}>
          • Theme system with dark mode
        </Text>
        <Text variant="body" color="textSecondary" style={{ marginBottom: theme.spacing.xs }}>
          • Custom hooks
        </Text>
        <Text variant="body" color="textSecondary" style={{ marginBottom: theme.spacing.xs }}>
          • Auth flow implementation
        </Text>
        <Text variant="body" color="textSecondary" style={{ marginBottom: theme.spacing.xs }}>
          • Formik + Yup for forms
        </Text>
        <Text variant="body" color="textSecondary" style={{ marginBottom: theme.spacing.xs }}>
          • MMKV for fast storage
        </Text>
        <Text variant="body" color="textSecondary" style={{ marginBottom: theme.spacing.xs }}>
          • Keychain for secure tokens
        </Text>
      </View>
    </Container>
  );
};

export default HomeScreen;
