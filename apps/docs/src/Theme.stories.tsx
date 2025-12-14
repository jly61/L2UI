import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme, darkTheme } from '@l2ui/styles';
import { Button } from '@l2ui/components';
import { Input } from '@l2ui/components';
import { Select } from '@l2ui/components';
import { Checkbox } from '@l2ui/components';

interface ThemeDemoProps {
  themeMode: 'light' | 'dark';
  enableReset: boolean;
  enableCSSVariables: boolean;
}

const ThemeDemo: React.FC<ThemeDemoProps> = ({ themeMode, enableReset, enableCSSVariables }) => {
  const theme = themeMode === 'dark' ? darkTheme : defaultTheme;
  const [isDark, setIsDark] = useState(themeMode === 'dark');

  return (
    <ThemeProvider theme={isDark ? darkTheme : defaultTheme}>
      <div style={{ padding: '24px', background: theme.colors.background, minHeight: '400px' }}>
        <div style={{ marginBottom: '24px' }}>
          <Button onClick={() => setIsDark(!isDark)}>切换到{isDark ? '亮色' : '暗色'}主题</Button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          <Input placeholder="输入框示例" />
          <Select
            options={[
              { value: '1', label: '选项一' },
              { value: '2', label: '选项二' },
            ]}
            placeholder="选择器示例"
          />
          <Checkbox>复选框示例</Checkbox>
          <Button type="primary">主要按钮</Button>
          <Button>默认按钮</Button>
        </div>
        <div
          style={{
            marginTop: '24px',
            padding: '16px',
            background: theme.colors.hover,
            borderRadius: '4px',
          }}
        >
          <div style={{ fontSize: '12px', color: theme.colors.textSecondary }}>
            全局样式重置: {enableReset ? '已启用' : '已禁用'}
          </div>
          <div style={{ fontSize: '12px', color: theme.colors.textSecondary, marginTop: '8px' }}>
            CSS 变量: {enableCSSVariables ? '已启用' : '已禁用'}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

const meta: Meta<typeof ThemeDemo> = {
  title: 'Theme/主题系统',
  component: ThemeDemo,
  tags: ['autodocs'],
  argTypes: {
    themeMode: {
      control: 'select',
      options: ['light', 'dark'],
      description: '主题模式',
    },
    enableReset: {
      control: 'boolean',
      description: '是否启用全局样式重置',
    },
    enableCSSVariables: {
      control: 'boolean',
      description: '是否启用 CSS 变量',
    },
  },
  parameters: {
    docs: {
      description: {
        component: '主题系统演示，包括主题切换、颜色 Token、间距 Token 等。',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeDemo>;

export const Default: Story = {
  args: {
    themeMode: 'light',
    enableReset: true,
    enableCSSVariables: true,
  },
};

export const DarkMode: Story = {
  args: {
    themeMode: 'dark',
    enableReset: true,
    enableCSSVariables: true,
  },
};

export const ThemeSwitcher: Story = {
  render: () => {
    const [isDark, setIsDark] = useState(false);
    const theme = isDark ? darkTheme : defaultTheme;

    return (
      <ThemeProvider theme={theme}>
        <div style={{ padding: '24px', background: theme.colors.background, minHeight: '400px' }}>
          <div style={{ marginBottom: '24px' }}>
            <Button onClick={() => setIsDark(!isDark)}>切换到{isDark ? '亮色' : '暗色'}主题</Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
            <Input placeholder="输入框示例" />
            <Select
              options={[
                { value: '1', label: '选项一' },
                { value: '2', label: '选项二' },
              ]}
              placeholder="选择器示例"
            />
            <Checkbox>复选框示例</Checkbox>
            <Button type="primary">主要按钮</Button>
            <Button>默认按钮</Button>
          </div>
        </div>
      </ThemeProvider>
    );
  },
};

export const ColorTokens: Story = {
  render: () => {
    return (
      <ThemeProvider theme={defaultTheme}>
        <div style={{ padding: '24px' }}>
          <h2 style={{ marginBottom: '16px' }}>颜色 Token</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            {Object.entries(defaultTheme.colors).map(([key, value]) => (
              <div key={key} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '100%',
                    height: '80px',
                    backgroundColor: value,
                    borderRadius: '4px',
                    marginBottom: '8px',
                    border: '1px solid #d9d9d9',
                  }}
                />
                <div style={{ fontSize: '12px', color: '#666' }}>{key}</div>
                <div style={{ fontSize: '12px', color: '#999' }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </ThemeProvider>
    );
  },
};

export const SpacingTokens: Story = {
  render: () => {
    return (
      <ThemeProvider theme={defaultTheme}>
        <div style={{ padding: '24px' }}>
          <h2 style={{ marginBottom: '16px' }}>间距 Token</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.entries(defaultTheme.spacing).map(([key, value]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '80px', fontSize: '14px' }}>{key}</div>
                <div
                  style={{
                    width: value,
                    height: '24px',
                    backgroundColor: defaultTheme.colors.primary,
                    borderRadius: '2px',
                  }}
                />
                <div style={{ fontSize: '12px', color: '#666' }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </ThemeProvider>
    );
  },
};
