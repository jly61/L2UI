import { ReactNode, FormHTMLAttributes } from 'react';

/**
 * 表单布局方式
 */
export type FormLayout = 'horizontal' | 'vertical' | 'inline';

/**
 * 表单字段验证规则
 */
export interface FormRule {
  /**
   * 是否必填
   */
  required?: boolean;
  /**
   * 错误提示信息
   */
  message?: string;
  /**
   * 自定义验证函数
   */
  validator?: (
    value: any,
    formValues: Record<string, any>
  ) => boolean | string | Promise<boolean | string>;
  /**
   * 正则表达式验证
   */
  pattern?: RegExp;
  /**
   * 最小长度（字符串）或最小值（数字）
   */
  min?: number;
  /**
   * 最大长度（字符串）或最大值（数字）
   */
  max?: number;
  /**
   * 类型验证
   */
  type?: 'string' | 'number' | 'email' | 'url';
}

/**
 * 表单字段配置
 */
export interface FormField {
  /**
   * 字段名
   */
  name: string;
  /**
   * 标签文本
   */
  label?: string;
  /**
   * 验证规则
   */
  rules?: FormRule[];
  /**
   * 初始值
   */
  initialValue?: any;
  /**
   * 是否必填（快捷方式）
   */
  required?: boolean;
}

/**
 * 表单值
 */
export type FormValues = Record<string, any>;

/**
 * 表单属性
 */
export interface FormProps extends Omit<
  FormHTMLAttributes<HTMLFormElement>,
  'onSubmit' | 'onReset'
> {
  /**
   * 表单布局
   * @default 'vertical'
   */
  layout?: FormLayout;
  /**
   * 标签宽度（horizontal 布局时有效）
   */
  labelWidth?: number | string;
  /**
   * 初始值
   */
  initialValues?: FormValues;
  /**
   * 表单字段配置
   */
  fields?: FormField[];
  /**
   * 提交回调
   */
  onSubmit?: (values: FormValues) => void | Promise<void>;
  /**
   * 重置回调
   */
  onReset?: () => void;
  /**
   * 值变化回调
   */
  onValuesChange?: (changedValues: FormValues, allValues: FormValues) => void;
  /**
   * 子元素
   */
  children?: ReactNode;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

/**
 * 表单项属性
 */
export interface FormItemProps {
  /**
   * 字段名
   */
  name?: string;
  /**
   * 标签文本
   */
  label?: string;
  /**
   * 验证规则
   */
  rules?: FormRule[];
  /**
   * 是否必填（快捷方式）
   */
  required?: boolean;
  /**
   * 标签宽度（horizontal 布局时有效）
   */
  labelWidth?: number | string;
  /**
   * 子元素
   */
  children?: ReactNode;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

/**
 * Form 实例方法
 */
export interface FormInstance {
  /**
   * 获取表单值
   */
  getFieldsValue: () => FormValues;
  /**
   * 获取指定字段值
   */
  getFieldValue: (name: string) => any;
  /**
   * 设置字段值
   */
  setFieldValue: (name: string, value: any) => void;
  /**
   * 设置多个字段值
   */
  setFieldsValue: (values: FormValues) => void;
  /**
   * 重置表单
   */
  resetFields: () => void;
  /**
   * 验证表单
   */
  validateFields: () => Promise<FormValues>;
  /**
   * 验证指定字段
   */
  validateField: (name: string) => Promise<any>;
  /**
   * 获取字段错误
   */
  getFieldError: (name: string) => string | undefined;
  /**
   * 获取所有字段错误
   */
  getFieldsError: () => Record<string, string>;
  /**
   * 清除字段错误
   */
  clearErrors: (name?: string) => void;
}
