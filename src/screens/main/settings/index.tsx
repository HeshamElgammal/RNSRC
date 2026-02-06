import React from 'react';
import { View, Switch, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks';
import { useAppSelector, useAppDispatch } from '@hooks';
import { Container, Text } from '@components';
import { toggleTheme, setLanguage } from '@store/main';
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
        <Text variant="h3" style={{ marginBottom: theme.spacing.md }}>
          Appearance
        </Text>
        
        <View style={styles.settingRow}>
          <Text variant="body">Dark Mode</Text>
          <Switch
            value={themeMode === 'dark'}
            onValueChange={() => dispatch(toggleTheme())}
            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
            thumbColor={theme.colors.background}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="h3" style={{ marginBottom: theme.spacing.md }}>
          Language
        </Text>
        
        <TouchableOpacity
          style={styles.settingRow}
          onPress={() => dispatch(setLanguage('en'))}
        >
          <Text variant="body">English</Text>
          {language === 'en' && <Text variant="bodyBold" color="primary" style={{ fontSize: 18 }}>✓</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingRow}
          onPress={() => dispatch(setLanguage('es'))}
        >
          <Text variant="body">Spanish</Text>
          {language === 'es' && <Text variant="bodyBold" color="primary" style={{ fontSize: 18 }}>✓</Text>}
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text variant="h3" style={{ marginBottom: theme.spacing.md }}>
          About
        </Text>
        <Text variant="body" color="textSecondary" style={{ lineHeight: 24 }}>
          React Native Starter Template{'\n'}
          Version 1.0.0{'\n'}
          Built with React Native 0.83 (New Architecture)
        </Text>
      </View>
    </Container>
  );
};

export default SettingsScreen;
