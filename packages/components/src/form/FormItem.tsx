import React, { useEffect, cloneElement, isValidElement } from 'react';
import { StyledFormItem, StyledFormLabel, StyledFormControl, StyledFormError } from './Form.styles';
import { useFormContext } from './FormContext';
import type { FormItemProps, FormRule } from './Form.types';

/**
 * 表单项组件
 */
export const FormItem: React.FC<FormItemProps> = ({
  name,
  label,
  rules = [],
  required = false,
  labelWidth,
  children,
  className,
  style,
}) => {
  const context = useFormContext();
  const {
    layout,
    labelWidth: formLabelWidth,
    values,
    errors,
    setFieldValue,
    setFieldError,
    validateField,
    registerField,
  } = context;

  // 合并规则
  const mergedRules: FormRule[] = [...rules];
  if (required) {
    mergedRules.push({ required: true, message: `${label || name || '该字段'}为必填项` });
  }

  // 注册字段规则
  useEffect(() => {
    if (name) {
      registerField(name, mergedRules);
    }
  }, [name, mergedRules, registerField]);

  // 获取字段值
  const fieldValue = name ? values[name] : undefined;
  const fieldError = name ? errors[name] : undefined;

  // 处理子元素变化
  const handleChange = (valueOrEvent: any, ...args: any[]) => {
    // 处理事件对象（Input、Select 等）
    let value = valueOrEvent;
    if (valueOrEvent && typeof valueOrEvent === 'object' && 'target' in valueOrEvent) {
      value = valueOrEvent.target.value;
    }
    
    if (name) {
      setFieldValue(name, value);
    }
    
    // 调用原始 onChange
    if (isValidElement(children) && children.props.onChange) {
      children.props.onChange(valueOrEvent, ...args);
    }
  };

  // 处理失焦验证
  const handleBlur = () => {
    if (name && mergedRules.length > 0) {
      validateField(name).catch(() => {
        // 验证失败，错误已设置
      });
    }
    // 调用原始 onBlur
    if (isValidElement(children) && children.props.onBlur) {
      children.props.onBlur();
    }
  };

  // 克隆子元素并注入 props
  const childElement = isValidElement(children)
    ? cloneElement(children as React.ReactElement<any>, {
        ...(name && fieldValue !== undefined ? { value: fieldValue } : {}),
        onChange: handleChange,
        onBlur: handleBlur,
        ...(fieldError && { 'aria-invalid': true }),
      })
    : children;

  const finalLabelWidth = labelWidth || formLabelWidth;

  return (
    <StyledFormItem $layout={layout} $labelWidth={finalLabelWidth} className={className} style={style}>
      {label && (
        <StyledFormLabel
          $layout={layout}
          $labelWidth={finalLabelWidth}
          $required={required || mergedRules.some((r) => r.required)}
          htmlFor={name}
        >
          {label}
        </StyledFormLabel>
      )}
      <StyledFormControl $layout={layout}>
        {childElement}
        {fieldError && <StyledFormError>{fieldError}</StyledFormError>}
      </StyledFormControl>
    </StyledFormItem>
  );
};

FormItem.displayName = 'FormItem';

export default FormItem;

