import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@hooks/useTheme';
import { useAuth } from '@hooks';
import { Container } from '@components';
import { createStyles } from './styles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<MainStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const styles = createStyles(theme);

  return (
    <Container
      statusBarColor="secondary"
      scrollable
      contentContainerStyle={styles.content}
    >
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={styles.name}>{user?.name || 'User'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>User ID:</Text>
          <Text style={styles.infoValue}>{user?.id}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{user?.email}</Text>
        </View>
      </View>
    </Container>
  );
};

export default ProfileScreen;
