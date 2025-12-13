import React, { useRef, useState, useCallback, useImperativeHandle, forwardRef, useEffect, useMemo } from 'react';
import { StyledForm } from './Form.styles';
import { FormContext } from './FormContext';
import type { FormProps, FormInstance, FormValues, FormRule, FormField } from './Form.types';

/**
 * 验证字段值
 */
const validateValue = async (
  value: any,
  rules: FormRule[],
  formValues: FormValues
): Promise<string | undefined> => {
  for (const rule of rules) {
    // 必填验证
    if (rule.required) {
      if (value === undefined || value === null || value === '') {
        return rule.message || '该字段为必填项';
      }
    }

    // 类型验证
    if (rule.type) {
      if (value === undefined || value === null || value === '') {
        continue; // 空值跳过类型验证（由 required 处理）
      }
      switch (rule.type) {
        case 'email':
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))) {
            return rule.message || '请输入有效的邮箱地址';
          }
          break;
        case 'url':
          try {
            new URL(String(value));
          } catch {
            return rule.message || '请输入有效的 URL';
          }
          break;
        case 'number':
          if (isNaN(Number(value))) {
            return rule.message || '请输入有效的数字';
          }
          break;
      }
    }

    // 正则验证
    if (rule.pattern && value !== undefined && value !== null && value !== '') {
      if (!rule.pattern.test(String(value))) {
        return rule.message || '格式不正确';
      }
    }

    // 长度/数值范围验证
    if (rule.min !== undefined && value !== undefined && value !== null && value !== '') {
      const numValue = typeof value === 'string' ? value.length : Number(value);
      if (numValue < rule.min) {
        return rule.message || `最小值为 ${rule.min}`;
      }
    }
    if (rule.max !== undefined && value !== undefined && value !== null && value !== '') {
      const numValue = typeof value === 'string' ? value.length : Number(value);
      if (numValue > rule.max) {
        return rule.message || `最大值为 ${rule.max}`;
      }
    }

    // 自定义验证
    if (rule.validator) {
      const result = await rule.validator(value, formValues);
      if (result !== true) {
        return typeof result === 'string' ? result : rule.message || '验证失败';
      }
    }
  }
  return undefined;
};

/**
 * 表单组件
 */
export const Form = forwardRef<FormInstance, FormProps>(
  (
    {
      layout = 'vertical',
      labelWidth,
      initialValues = {},
      fields = [],
      onSubmit,
      onReset,
      onValuesChange,
      children,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    // 计算初始值
    const getInitialValues = useCallback(() => {
      const initial: FormValues = { ...initialValues };
      fields.forEach((field) => {
        if (field.initialValue !== undefined && initial[field.name] === undefined) {
          initial[field.name] = field.initialValue;
        }
      });
      return initial;
    }, [initialValues, fields]);

    const initialValuesMemo = useMemo(() => getInitialValues(), [getInitialValues]);
    const [values, setValues] = useState<FormValues>(initialValuesMemo);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const fieldRulesRef = useRef<Record<string, FormRule[]>>({});
    const initialValuesRef = useRef<FormValues>(initialValuesMemo);

    // 同步 initialValues 和 fields 的引用
    useEffect(() => {
      const newInitialValues = getInitialValues();
      initialValuesRef.current = newInitialValues;
    }, [getInitialValues]);

    // 注册字段规则
    const registerField = useCallback((name: string, rules: FormRule[]) => {
      fieldRulesRef.current[name] = rules;
    }, []);

    // 设置字段值
    const setFieldValue = useCallback(
      (name: string, value: any) => {
        setValues((prev) => {
          const newValues = { ...prev, [name]: value };
          onValuesChange?.({ [name]: value }, newValues);
          return newValues;
        });
        // 清除该字段的错误
        if (errors[name]) {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
          });
        }
      },
      [errors, onValuesChange]
    );

    // 设置多个字段值
    const setFieldsValue = useCallback((newValues: FormValues) => {
      setValues((prev) => {
        const updated = { ...prev, ...newValues };
        onValuesChange?.(newValues, updated);
        return updated;
      });
    }, [onValuesChange]);

    // 设置字段错误
    const setFieldError = useCallback((name: string, error: string | undefined) => {
      setErrors((prev) => {
        if (error) {
          return { ...prev, [name]: error };
        }
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }, []);

    // 验证字段
    const validateField = useCallback(
      async (name: string): Promise<any> => {
        const rules = fieldRulesRef.current[name] || [];
        const value = values[name];
        const error = await validateValue(value, rules, values);
        setFieldError(name, error);
        if (error) {
          throw new Error(error);
        }
        return value;
      },
      [values, setFieldError]
    );

    // 验证所有字段
    const validateFields = useCallback(async (): Promise<FormValues> => {
      const fieldNames = Object.keys(fieldRulesRef.current);
      const newErrors: Record<string, string> = {};

      for (const name of fieldNames) {
        const rules = fieldRulesRef.current[name] || [];
        const value = values[name];
        const error = await validateValue(value, rules, values);
        if (error) { 
          newErrors[name] = error;
        }
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        throw new Error('表单验证失败');
      }

      return values;
    }, [values]);

    // 获取字段值
    const getFieldValue = useCallback(
      (name: string) => {
        return values[name];
      },
      [values]
    );

    // 获取所有字段值
    const getFieldsValue = useCallback(() => {
      return { ...values };
    }, [values]);

    // 获取字段错误
    const getFieldError = useCallback(
      (name: string) => {
        return errors[name];
      },
      [errors]
    );

    // 获取所有字段错误
    const getFieldsError = useCallback(() => {
      return { ...errors };
    }, [errors]);

    // 清除错误
    const clearErrors = useCallback((name?: string) => {
      if (name) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      } else {
        setErrors({});
      }
    }, []);

    // 重置表单
    const resetFields = useCallback(() => {
      const resetValues = getInitialValues();
      setValues(resetValues);
      setErrors({});
      // 更新 ref 以保持同步
      initialValuesRef.current = resetValues;
      onReset?.();
    }, [getInitialValues, onReset]);

    // 暴露实例方法
    useImperativeHandle(ref, () => ({
      getFieldsValue,
      getFieldValue,
      setFieldValue,
      setFieldsValue,
      resetFields,
      validateFields,
      validateField,
      getFieldError,
      getFieldsError,
      clearErrors,
    }));

    // 处理表单提交
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const validatedValues = await validateFields();
        await onSubmit?.(validatedValues);
      } catch (error) {
        // 验证失败，不执行提交
      }
    };

    // 处理表单重置
    const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      resetFields();
    };

    const formInstance: FormInstance = {
      getFieldsValue,
      getFieldValue,
      setFieldValue,
      setFieldsValue,
      resetFields,
      validateFields,
      validateField,
      getFieldError,
      getFieldsError,
      clearErrors,
    };

    return (
      <FormContext.Provider
        value={{
          form: formInstance,
          layout,
          labelWidth,
          values,
          errors,
          setFieldValue,
          setFieldError,
          validateField,
          registerField,
        }}
      >
        <StyledForm
          $layout={layout}
          onSubmit={handleSubmit}
          onReset={handleReset}
          className={className}
          style={style}
          {...rest}
        >
          {children}
        </StyledForm>
      </FormContext.Provider>
    );
  }
);

Form.displayName = 'Form';

export default Form;

