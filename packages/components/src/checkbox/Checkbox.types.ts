import { InputHTMLAttributes, ReactNode } from 'react';

/**
 * 复选框尺寸
 */
export type CheckboxSize = 'small' | 'medium' | 'large';

/**
 * 复选框属性
 */
export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type' | 'onChange'
> {
  /**
   * 尺寸
   * @default 'medium'
   */
  size?: CheckboxSize;
  /**
   * 是否选中（受控）
   */
  checked?: boolean;
  /**
   * 是否默认选中（非受控）
   */
  defaultChecked?: boolean;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否不确定状态
   * @default false
   */
  indeterminate?: boolean;
  /**
   * 变化回调
   */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * 标签文本
   */
  children?: ReactNode;
}
