import React from 'react';
import { ThemeProvider, ThemeProviderProps } from './ThemeProvider';

export interface ConfigProviderProps extends ThemeProviderProps {
  // 未来可以添加更多全局配置
  // locale?: string;
  // size?: 'small' | 'medium' | 'large';
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ theme, children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

ConfigProvider.displayName = 'ConfigProvider';

