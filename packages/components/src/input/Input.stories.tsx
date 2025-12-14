import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@l2ui/styles';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={defaultTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    block: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Basic: Story = {
  args: {
    placeholder: '请输入',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Input size="small" placeholder="小号" />
      <Input size="medium" placeholder="中号" />
      <Input size="large" placeholder="大号" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '禁用状态',
  },
};

export const Block: Story = {
  args: {
    block: true,
    placeholder: '块级输入，占满容器宽度',
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Input {...args} />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('受控值');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="受控输入" />
        <div style={{ fontSize: 12, color: '#666' }}>当前值：{value}</div>
      </div>
    );
  },
};
