import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@l2ui/styles';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
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
    disabled: {
      control: 'boolean',
    },
    indeterminate: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {
  args: {
    children: '复选框',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox size="small">小号复选框</Checkbox>
      <Checkbox size="medium">中号复选框</Checkbox>
      <Checkbox size="large">大号复选框</Checkbox>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox disabled>禁用未选中</Checkbox>
      <Checkbox disabled defaultChecked>
        禁用已选中
      </Checkbox>
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(true);

    const handleChange = (newChecked: boolean) => {
      setChecked(newChecked);
      setIndeterminate(false);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Checkbox indeterminate={indeterminate} checked={checked} onChange={handleChange}>
          不确定状态（点击后变为确定状态）
        </Checkbox>
        <div style={{ fontSize: 12, color: '#666' }}>
          当前状态: {indeterminate ? '不确定' : checked ? '已选中' : '未选中'}
        </div>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Checkbox checked={checked} onChange={(val) => setChecked(val)}>
          受控复选框
        </Checkbox>
        <div style={{ fontSize: 12, color: '#666' }}>当前状态: {checked ? '已选中' : '未选中'}</div>
      </div>
    );
  },
};

export const Group: Story = {
  render: () => {
    const [checkedList, setCheckedList] = useState<string[]>([]);

    const options = [
      { value: 'apple', label: '苹果' },
      { value: 'banana', label: '香蕉' },
      { value: 'orange', label: '橙子' },
    ];

    const handleChange = (value: string, checked: boolean) => {
      if (checked) {
        setCheckedList([...checkedList, value]);
      } else {
        setCheckedList(checkedList.filter((item) => item !== value));
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {options.map((option) => (
          <Checkbox
            key={option.value}
            checked={checkedList.includes(option.value)}
            onChange={(checked) => handleChange(option.value, checked)}
          >
            {option.label}
          </Checkbox>
        ))}
        <div style={{ fontSize: 12, color: '#666', marginTop: '8px' }}>
          已选择: {checkedList.length > 0 ? checkedList.join(', ') : '无'}
        </div>
      </div>
    );
  },
};

