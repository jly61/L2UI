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

  // 获取字段值（如果 name 存在，即使值为 undefined 也要获取，确保是受控组件）
  const fieldValue = name !== undefined ? values[name] : undefined;
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
  // 如果字段有 name，始终传递 value，确保组件是受控的
  const childElement = isValidElement(children)
    ? cloneElement(children as React.ReactElement<any>, {
        ...(name !== undefined
          ? { value: fieldValue ?? '' }
          : children.props.value !== undefined
            ? { value: children.props.value }
            : {}),
        onChange: handleChange,
        onBlur: handleBlur,
        ...(fieldError && { 'aria-invalid': true }),
      })
    : children;

  const finalLabelWidth = labelWidth || formLabelWidth;

  return (
    <StyledFormItem
      $layout={layout}
      $labelWidth={finalLabelWidth}
      className={className}
      style={style}
    >
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
