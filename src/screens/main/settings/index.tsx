import React from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks';
import { useAppSelector, useAppDispatch } from '@hooks';
import { Container } from '@components';
import { toggleTheme, setLanguage } from '@store/slices/appSlice';
import { createStyles } from './styles';

const SettingsScreen: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { theme: themeMode, language } = useAppSelector((state) => state.app);
  const styles = createStyles(theme);

  return (
    <Container
      statusBarColor="surface"
      scrollable
      contentContainerStyle={styles.content}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch
            value={themeMode === 'dark'}
            onValueChange={() => dispatch(toggleTheme())}
            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
            thumbColor={theme.colors.background}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language</Text>
        
        <TouchableOpacity
          style={styles.settingRow}
          onPress={() => dispatch(setLanguage('en'))}
        >
          <Text style={styles.settingLabel}>English</Text>
          {language === 'en' && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingRow}
          onPress={() => dispatch(setLanguage('es'))}
        >
          <Text style={styles.settingLabel}>Spanish</Text>
          {language === 'es' && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>
          React Native Starter Template{'\n'}
          Version 1.0.0{'\n'}
          Built with React Native 0.83 (New Architecture)
        </Text>
      </View>
    </Container>
  );
};

export default SettingsScreen;
