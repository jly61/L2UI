import { Ref } from 'react';

/**
 * 选择器尺寸
 */
export type SelectSize = 'small' | 'medium' | 'large';

/**
 * 选项数据
 */
export interface SelectOption {
  /**
   * 选项值
   */
  value: string | number;
  /**
   * 选项标签
   */
  label: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
}

/**
 * 选择器属性
 */
export interface SelectProps {
  /**
   * 选项列表
   */
  options: SelectOption[];
  /**
   * 尺寸
   * @default 'medium'
   */
  size?: SelectSize;
  /**
   * 占位提示
   * @default '请选择'
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
  value?: string | number;
  /**
   * 非受控初始值
   */
  defaultValue?: string | number;
  /**
   * 值变化回调
   */
  onChange?: (value: string | number, option: SelectOption) => void;
  /**
   * 外部 ref 透传
   */
  selectRef?: Ref<HTMLDivElement>;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

