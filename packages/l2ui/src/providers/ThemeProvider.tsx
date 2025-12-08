import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { defaultTheme } from '@l2ui/styles';
import type { Theme } from '@l2ui/styles';

export interface ThemeProviderProps {
  theme?: Partial<Theme>;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {
  const mergedTheme = theme ? { ...defaultTheme, ...theme } : defaultTheme;

  return <StyledThemeProvider theme={mergedTheme}>{children}</StyledThemeProvider>;
};

ThemeProvider.displayName = 'ThemeProvider';

