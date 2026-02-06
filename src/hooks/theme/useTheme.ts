import { useAppSelector } from '../redux';
import { getTheme } from '@theme';
import type { Theme } from '@theme/types';

export const useTheme = (): Theme => {
  const themeMode = useAppSelector((state) => state.app.theme);
  return getTheme(themeMode === 'dark');
};
