import React, { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@l2ui/styles';
import { Form, FormItem } from './index';
import { Input } from '../input/Input';
import { Select } from '../select/Select';
import { DatePicker } from '../datepicker/DatePicker';
import { Checkbox } from '../checkbox/Checkbox';
import { Button } from '../button/Button';
import type { FormInstance } from './Form.types';

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={defaultTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical', 'inline'],
      description: '表单布局方式',
    },
    labelWidth: {
      control: 'text',
      description: '标签宽度（horizontal 布局时有效）',
    },
    onSubmit: {
      action: 'submitted',
      description: '表单提交回调',
    },
    onReset: {
      action: 'reset',
      description: '表单重置回调',
    },
    onValuesChange: {
      action: 'valuesChanged',
      description: '值变化回调',
    },
  },
  parameters: {
    docs: {
      description: {
        component: '表单组件，提供表单验证、字段管理、布局等功能。',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  args: {
    layout: 'vertical',
  },
  render: (args) => (
    <Form {...args} style={{ maxWidth: 400 }}>
      <FormItem name="username" label="用户名" required>
        <Input placeholder="请输入用户名" />
      </FormItem>
      <FormItem name="email" label="邮箱" required>
        <Input placeholder="请输入邮箱" />
      </FormItem>
      <FormItem>
        <Button type="submit">提交</Button>
      </FormItem>
    </Form>
  ),
};

export const Basic: Story = {
  render: () => {
    const handleSubmit = (values: Record<string, any>) => {
      console.log('提交值:', values);
      alert(JSON.stringify(values, null, 2));
    };

    return (
      <Form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <FormItem name="username" label="用户名" required>
          <Input placeholder="请输入用户名" />
        </FormItem>
        <FormItem name="email" label="邮箱" required>
          <Input placeholder="请输入邮箱" />
        </FormItem>
        <FormItem>
          <Button type="submit">提交</Button>
        </FormItem>
      </Form>
    );
  },
};

export const Horizontal: Story = {
  render: () => {
    const handleSubmit = (values: Record<string, any>) => {
      console.log('提交值:', values);
    };

    return (
      <Form onSubmit={handleSubmit} layout="horizontal" labelWidth={100} style={{ maxWidth: 500 }}>
        <FormItem name="username" label="用户名" required>
          <Input placeholder="请输入用户名" />
        </FormItem>
        <FormItem name="email" label="邮箱" required>
          <Input placeholder="请输入邮箱" />
        </FormItem>
        <FormItem>
          <Button type="submit">提交</Button>
        </FormItem>
      </Form>
    );
  },
};

export const Inline: Story = {
  render: () => {
    const handleSubmit = (values: Record<string, any>) => {
      console.log('提交值:', values);
    };

    return (
      <Form onSubmit={handleSubmit} layout="inline" style={{ maxWidth: 600 }}>
        <FormItem name="keyword" label="关键词">
          <Input placeholder="搜索" />
        </FormItem>
        <FormItem name="category" label="分类">
          <Select
            options={[
              { value: '1', label: '分类一' },
              { value: '2', label: '分类二' },
            ]}
            placeholder="请选择"
          />
        </FormItem>
        <FormItem>
          <Button type="submit">搜索</Button>
        </FormItem>
      </Form>
    );
  },
};

export const Validation: Story = {
  render: () => {
    const handleSubmit = (values: Record<string, any>) => {
      console.log('提交值:', values);
      alert('验证通过！');
    };

    return (
      <Form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <FormItem
          name="username"
          label="用户名"
          required
          rules={[
            { min: 3, message: '用户名至少3个字符' },
            { max: 20, message: '用户名最多20个字符' },
          ]}
        >
          <Input placeholder="请输入用户名" />
        </FormItem>
        <FormItem
          name="email"
          label="邮箱"
          required
          rules={[{ type: 'email', message: '请输入有效的邮箱地址' }]}
        >
          <Input placeholder="请输入邮箱" />
        </FormItem>
        <FormItem
          name="password"
          label="密码"
          required
          rules={[
            { min: 6, message: '密码至少6个字符' },
            {
              validator: (value) => {
                if (!/[A-Z]/.test(value)) {
                  return '密码必须包含大写字母';
                }
                return true;
              },
            },
          ]}
        >
          <Input type="password" placeholder="请输入密码" />
        </FormItem>
        <FormItem>
          <Button type="submit">提交</Button>
        </FormItem>
      </Form>
    );
  },
};

export const ComplexForm: Story = {
  render: () => {
    const handleSubmit = (values: Record<string, any>) => {
      console.log('提交值:', values);
      alert(JSON.stringify(values, null, 2));
    };

    return (
      <Form onSubmit={handleSubmit} initialValues={{ agree: false }} style={{ maxWidth: 500 }}>
        <FormItem name="name" label="姓名" required>
          <Input placeholder="请输入姓名" />
        </FormItem>
        <FormItem name="email" label="邮箱" required>
          <Input placeholder="请输入邮箱" />
        </FormItem>
        <FormItem name="date" label="日期" required>
          <DatePicker placeholder="请选择日期" />
        </FormItem>
        <FormItem name="category" label="分类" required>
          <Select
            options={[
              { value: '1', label: '选项一' },
              { value: '2', label: '选项二' },
              { value: '3', label: '选项三' },
            ]}
            placeholder="请选择"
          />
        </FormItem>
        <FormItem name="agree" label="">
          <Checkbox>我同意相关条款</Checkbox>
        </FormItem>
        <FormItem>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button type="submit">提交</Button>
            <Button type="reset">重置</Button>
          </div>
        </FormItem>
      </Form>
    );
  },
};

export const FormInstance: Story = {
  render: () => {
    const formRef = useRef<FormInstance>(null);

    const handleGetValues = () => {
      const values = formRef.current?.getFieldsValue();
      alert(JSON.stringify(values, null, 2));
    };

    const handleValidate = async () => {
      try {
        const values = await formRef.current?.validateFields();
        alert('验证通过: ' + JSON.stringify(values, null, 2));
      } catch {
        alert('验证失败，请检查表单');
      }
    };

    return (
      <div>
        <Form ref={formRef} style={{ maxWidth: 400, marginBottom: 16 }}>
          <FormItem name="username" label="用户名" required>
            <Input placeholder="请输入用户名" />
          </FormItem>
          <FormItem name="email" label="邮箱" required>
            <Input placeholder="请输入邮箱" />
          </FormItem>
        </Form>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button onClick={handleGetValues}>获取值</Button>
          <Button onClick={handleValidate}>验证</Button>
        </div>
      </div>
    );
  },
};

