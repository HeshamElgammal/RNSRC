import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { useAuth } from '@hooks';
import { useAppDispatch } from '@hooks';
import { Container, Button } from '@components';
import { toggleTheme } from '@store/slices/appSlice';
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
      <Text style={styles.welcomeText}>Welcome, {user?.name || 'User'}!</Text>
      <Text style={styles.emailText}>{user?.email}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        
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
        <Text style={styles.infoTitle}>App Information</Text>
        <Text style={styles.infoText}>
          This is a React Native starter template with:
        </Text>
        <Text style={styles.infoItem}>• Redux Toolkit for state management</Text>
        <Text style={styles.infoItem}>• React Navigation v6</Text>
        <Text style={styles.infoItem}>• TypeScript support</Text>
        <Text style={styles.infoItem}>• Theme system with dark mode</Text>
        <Text style={styles.infoItem}>• Custom hooks</Text>
        <Text style={styles.infoItem}>• Auth flow implementation</Text>
        <Text style={styles.infoItem}>• Formik + Yup for forms</Text>
        <Text style={styles.infoItem}>• MMKV for fast storage</Text>
        <Text style={styles.infoItem}>• Keychain for secure tokens</Text>
      </View>
    </Container>
  );
};

export default HomeScreen;
