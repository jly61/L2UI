import { InputHTMLAttributes, Ref } from 'react';

/**
 * 输入框尺寸
 */
export type InputSize = 'small' | 'medium' | 'large';

/**
 * 输入框属性
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * 尺寸
   * @default 'medium'
   */
  size?: InputSize;
  /**
   * 占位提示
   * @default '请输入'
   */
  placeholder?: string;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否块级，撑满容器宽度
   * @default false
   */
  block?: boolean;
  /**
   * 受控值
   */
  value?: string;
  /**
   * 非受控初始值
   */
  defaultValue?: string;
  /**
   * 外部 ref 透传
   */
  inputRef?: Ref<HTMLInputElement>;
}