import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@l2ui/styles';
import { Form, FormItem } from './index';
import { Input } from '../input/Input';
import { Button } from '../button/Button';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={defaultTheme}>{component}</ThemeProvider>);
};

describe('Form', () => {
  it('应该正确渲染', () => {
    renderWithTheme(
      <Form>
        <FormItem name="test" label="测试">
          <Input />
        </FormItem>
      </Form>
    );
    expect(screen.getByText('测试')).toBeInTheDocument();
  });

  it('应该支持提交', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    renderWithTheme(
      <Form onSubmit={handleSubmit}>
        <FormItem name="name" label="姓名">
          <Input />
        </FormItem>
        <Button type="submit">提交</Button>
      </Form>
    );

    const input = screen.getByRole('textbox');
    await user.type(input, '测试');
    await user.click(screen.getByText('提交'));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({ name: '测试' });
    });
  });

  it('应该支持验证', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    renderWithTheme(
      <Form onSubmit={handleSubmit}>
        <FormItem name="name" label="姓名" required>
          <Input />
        </FormItem>
        <Button type="submit">提交</Button>
      </Form>
    );

    await user.click(screen.getByText('提交'));

    await waitFor(() => {
      expect(screen.getByText(/必填项/)).toBeInTheDocument();
      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });

  it('应该支持重置', async () => {
    const user = userEvent.setup();
    const handleReset = vi.fn();
    renderWithTheme(
      <Form onReset={handleReset} initialValues={{ name: '初始值' }}>
        <FormItem name="name" label="姓名">
          <Input />
        </FormItem>
        <Button type="reset">重置</Button>
      </Form>
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('初始值');

    await user.type(input, '新值');
    await user.click(screen.getByText('重置'));

    await waitFor(() => {
      expect(input.value).toBe('初始值');
      expect(handleReset).toHaveBeenCalled();
    });
  });
});

