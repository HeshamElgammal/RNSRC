import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '@hooks';
import { useAuth } from '@hooks';
import { Container, Text } from '@components';
import { useGetProfileQuery } from '@store/main';
import { createStyles } from './styles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<MainStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = () => {
  const theme = useTheme();
  const { user: authUser } = useAuth();
  const styles = createStyles(theme);
  
  // Fetch profile from API (will use cached data if available)
  const { data: profile, isLoading, error, refetch } = useGetProfileQuery();

  // Use API profile if available, otherwise fall back to auth user
  const user = profile || authUser;

  if (isLoading && !user) {
    return (
      <Container statusBarColor="secondary" scrollable contentContainerStyle={styles.content}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </Container>
    );
  }

  if (error) {
    return (
      <Container statusBarColor="secondary" scrollable contentContainerStyle={styles.content}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text variant="body" color="error" style={{ marginBottom: theme.spacing.md }}>
            Failed to load profile
          </Text>
          <Text variant="caption" color="textSecondary" onPress={() => refetch()}>
            Tap to retry
          </Text>
        </View>
      </Container>
    );
  }

  return (
    <Container
      statusBarColor="secondary"
      scrollable
      contentContainerStyle={styles.content}
    >
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text variant="h1" color="background">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <Text variant="h2" style={{ marginBottom: theme.spacing.xs }}>
          {user?.name || 'User'}
        </Text>
        <Text variant="body" color="textSecondary">
          {user?.email}
        </Text>
      </View>

      <View style={styles.section}>
        <Text variant="h3" style={{ marginBottom: theme.spacing.md }}>
          Account Information
        </Text>
        <View style={styles.infoRow}>
          <Text variant="body" color="textSecondary">User ID:</Text>
          <Text variant="bodyBold">{user?.id}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text variant="body" color="textSecondary">Email:</Text>
          <Text variant="bodyBold">{user?.email}</Text>
        </View>
      </View>
    </Container>
  );
};

export default ProfileScreen;
