import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@l2ui/styles';
import { Button } from './Button';

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
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'primary', 'dashed', 'link', 'text'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    loading: {
      control: 'boolean',
    },
    block: {
      control: 'boolean',
    },
    danger: {
      control: 'boolean',
    },
    ghost: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
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

