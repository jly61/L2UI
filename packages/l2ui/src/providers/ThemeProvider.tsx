import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { defaultTheme, GlobalStyles } from '@l2ui/styles';
import type { Theme } from '@l2ui/styles';

export interface ThemeProviderProps {
  /**
   * 主题配置（部分覆盖默认主题）
   */
  theme?: Partial<Theme>;
  /**
   * 是否启用全局样式重置
   * @default true
   */
  enableReset?: boolean;
  /**
   * 是否启用 CSS 变量
   * @default true
   */
  enableCSSVariables?: boolean;
  /**
   * 子元素
   */
  children: React.ReactNode;
}

/**
 * 主题提供者组件
 * 提供主题配置、全局样式、CSS 变量等功能
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  enableReset = true,
  enableCSSVariables = true,
  children,
}) => {
  const mergedTheme = theme ? { ...defaultTheme, ...theme } : defaultTheme;

  return (
    <StyledThemeProvider theme={mergedTheme}>
      <GlobalStyles
        theme={mergedTheme}
        enableReset={enableReset}
        enableCSSVariables={enableCSSVariables}
      />
      {children}
    </StyledThemeProvider>
  );
};

ThemeProvider.displayName = 'ThemeProvider';
