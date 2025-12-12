import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@l2ui/styles';
import { Select } from './Select';
import type { SelectOption } from './Select.types';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
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
type Story = StoryObj<typeof Select>;

const basicOptions: SelectOption[] = [
  { value: '1', label: '选项一' },
  { value: '2', label: '选项二' },
  { value: '3', label: '选项三' },
  { value: '4', label: '选项四' },
];

export const Basic: Story = {
  args: {
    options: basicOptions,
    placeholder: '请选择',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Select options={basicOptions} size="small" placeholder="小号" />
      <Select options={basicOptions} size="medium" placeholder="中号" />
      <Select options={basicOptions} size="large" placeholder="大号" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    options: basicOptions,
    disabled: true,
    placeholder: '禁用状态',
  },
};

export const Block: Story = {
  args: {
    options: basicOptions,
    block: true,
    placeholder: '块级选择器，占满容器宽度',
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Select {...args} />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string | number>('1');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Select
          options={basicOptions}
          value={value}
          onChange={(val) => setValue(val)}
        />
        <div style={{ fontSize: 12, color: '#666' }}>当前值：{value}</div>
      </div>
    );
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: '1', label: '选项一' },
      { value: '2', label: '选项二', disabled: true },
      { value: '3', label: '选项三' },
      { value: '4', label: '选项四', disabled: true },
    ],
    placeholder: '包含禁用选项',
  },
};

export const LongOptions: Story = {
  args: {
    options: [
      { value: '1', label: '这是一个很长的选项文本，用于测试文本溢出处理' },
      { value: '2', label: '选项二' },
      { value: '3', label: '选项三' },
      { value: '4', label: '选项四' },
      { value: '5', label: '选项五' },
      { value: '6', label: '选项六' },
      { value: '7', label: '选项七' },
      { value: '8', label: '选项八' },
    ],
    placeholder: '长选项列表',
  },
};