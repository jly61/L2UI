import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { globalReset } from './reset';
import { themeToCSSVariables } from './variables';
import type { Theme } from './theme/types';

interface GlobalStylesProps {
  theme: Theme;
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
}

/**
 * 全局样式组件
 * 提供样式重置、CSS 变量注入等功能
 */
const GlobalStyle = createGlobalStyle<{
  theme: Theme;
  enableReset?: boolean;
  enableCSSVariables?: boolean;
}>`
  ${(props) => (props.enableReset !== false ? globalReset : '')}

  ${(props) => {
    if (props.enableCSSVariables !== false) {
      const vars = themeToCSSVariables(props.theme);
      const cssVars = Object.entries(vars)
        .map(([key, value]) => `  ${key}: ${value};`)
        .join('\n');
      return `:root {\n${cssVars}\n}`;
    }
    return '';
  }}
`;

export const GlobalStyles: React.FC<GlobalStylesProps> = ({
  theme,
  enableReset = true,
  enableCSSVariables = true,
}) => {
  return (
    <GlobalStyle theme={theme} enableReset={enableReset} enableCSSVariables={enableCSSVariables} />
  );
};

export default GlobalStyles;
