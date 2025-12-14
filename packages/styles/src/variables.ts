import type { Theme } from './theme/types';

/**
 * 将主题对象转换为 CSS 变量
 */
export const themeToCSSVariables = (theme: Theme): Record<string, string> => {
  const vars: Record<string, string> = {};

  // 颜色变量
  Object.entries(theme.colors).forEach(([key, value]) => {
    vars[`--l2ui-color-${key}`] = value;
  });

  // 间距变量
  Object.entries(theme.spacing).forEach(([key, value]) => {
    vars[`--l2ui-spacing-${key}`] = value;
  });

  // 字体大小变量
  Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
    vars[`--l2ui-font-size-${key}`] = value;
  });

  // 字重变量
  Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
    vars[`--l2ui-font-weight-${key}`] = String(value);
  });

  // 行高变量
  Object.entries(theme.typography.lineHeight).forEach(([key, value]) => {
    vars[`--l2ui-line-height-${key}`] = String(value);
  });

  // 字体族变量
  vars['--l2ui-font-family'] = theme.typography.fontFamily;

  // 圆角变量
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    vars[`--l2ui-border-radius-${key}`] = value;
  });

  // 断点变量
  Object.entries(theme.breakpoints).forEach(([key, value]) => {
    vars[`--l2ui-breakpoint-${key}`] = value;
  });

  return vars;
};

/**
 * 生成 CSS 变量样式字符串
 */
export const generateCSSVariables = (theme: Theme): string => {
  const vars = themeToCSSVariables(theme);
  return Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
};

