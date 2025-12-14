import { createContext, useContext } from 'react';
import type { FormInstance, FormLayout, FormValues, FormRule } from './Form.types';

export interface FormContextValue {
  form: FormInstance;
  layout: FormLayout;
  labelWidth?: number | string;
  values: FormValues;
  errors: Record<string, string>;
  setFieldValue: (name: string, value: any) => void;
  setFieldError: (name: string, error: string | undefined) => void;
  validateField: (name: string) => Promise<any>;
  registerField: (name: string, rules: FormRule[]) => void;
}

export const FormContext = createContext<FormContextValue | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('FormItem must be used within Form');
  }
  return context;
};
