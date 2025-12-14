import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@l2ui/styles';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
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
    format: {
      control: 'select',
      options: ['YYYY-MM-DD', 'YYYY/MM/DD', 'DD-MM-YYYY', 'DD/MM/YYYY'],
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
type Story = StoryObj<typeof DatePicker>;

export const Basic: Story = {
  args: {
    placeholder: '请选择日期',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <DatePicker size="small" placeholder="小号" />
      <DatePicker size="medium" placeholder="中号" />
      <DatePicker size="large" placeholder="大号" />
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
    placeholder: '块级日期选择器，占满容器宽度',
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <DatePicker {...args} />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date(2024, 0, 15));
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <DatePicker
          value={date}
          onChange={(newDate) => setDate(newDate)}
          placeholder="受控日期选择器"
        />
        <div style={{ fontSize: 12, color: '#666' }}>
          当前日期: {date ? date.toLocaleDateString('zh-CN') : '未选择'}
        </div>
      </div>
    );
  },
};

export const Formats: Story = {
  render: () => {
    const [date1, setDate1] = useState<Date | null>(new Date(2024, 0, 15));
    const [date2, setDate2] = useState<Date | null>(new Date(2024, 0, 15));
    const [date3, setDate3] = useState<Date | null>(new Date(2024, 0, 15));
    const [date4, setDate4] = useState<Date | null>(new Date(2024, 0, 15));

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>YYYY-MM-DD</div>
          <DatePicker value={date1} onChange={setDate1} format="YYYY-MM-DD" />
        </div>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>YYYY/MM/DD</div>
          <DatePicker value={date2} onChange={setDate2} format="YYYY/MM/DD" />
        </div>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>DD-MM-YYYY</div>
          <DatePicker value={date3} onChange={setDate3} format="DD-MM-YYYY" />
        </div>
        <div>
          <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>DD/MM/YYYY</div>
          <DatePicker value={date4} onChange={setDate4} format="DD/MM/YYYY" />
        </div>
      </div>
    );
  },
};
