import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { Button } from '@l2ui/components';

// 使用与 preview.tsx 相同的主题
const defaultTheme = {
  colors: {
    primary: '#1890ff',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#1890ff',
    text: '#000000d9',
    textSecondary: '#00000073',
    border: '#d9d9d9',
    background: '#ffffff',
    hover: 'rgba(0, 0, 0, 0.06)',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  typography: {
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`,
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      xxl: '24px',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  borderRadius: {
    sm: '2px',
    default: '4px',
    lg: '8px',
    full: '9999px',
  },
  breakpoints: {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1600px',
  },
};

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={defaultTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: '默认按钮',
  },
};

export const Primary: Story = {
  args: {
    type: 'primary',
    children: '主要按钮',
  },
};

export const Dashed: Story = {
  args: {
    type: 'dashed',
    children: '虚线按钮',
  },
};

export const Link: Story = {
  args: {
    type: 'link',
    children: '链接按钮',
  },
};

export const Text: Story = {
  args: {
    type: 'text',
    children: '文本按钮',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button size="small">小按钮</Button>
      <Button size="medium">中按钮</Button>
      <Button size="large">大按钮</Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    loading: true,
    children: '加载中',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: '禁用按钮',
  },
};

export const Danger: Story = {
  args: {
    danger: true,
    type: 'primary',
    children: '危险按钮',
  },
};

export const Ghost: Story = {
  args: {
    ghost: true,
    type: 'primary',
    children: '幽灵按钮',
  },
};

export const Block: Story = {
  args: {
    block: true,
    children: '块级按钮',
  },
};
