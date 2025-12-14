# Form 表单

表单组件，提供表单验证、字段管理、布局等功能。

## 基本用法

```tsx
import { Form, FormItem } from '@l2ui/components';
import { Input, Button } from '@l2ui/components';

function App() {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem name="username" label="用户名" required>
        <Input placeholder="请输入用户名" />
      </FormItem>
      <FormItem>
        <Button type="submit">提交</Button>
      </FormItem>
    </Form>
  );
}
```

## 布局方式

### 垂直布局（默认）

```tsx
<Form layout="vertical">
  <FormItem name="username" label="用户名">
    <Input />
  </FormItem>
</Form>
```

### 水平布局

```tsx
<Form layout="horizontal" labelWidth={100}>
  <FormItem name="username" label="用户名">
    <Input />
  </FormItem>
</Form>
```

### 行内布局

```tsx
<Form layout="inline">
  <FormItem name="keyword" label="关键词">
    <Input />
  </FormItem>
  <FormItem>
    <Button type="submit">搜索</Button>
  </FormItem>
</Form>
```

## 表单验证

### 必填验证

```tsx
<FormItem name="username" label="用户名" required>
  <Input />
</FormItem>
```

### 规则验证

```tsx
<FormItem
  name="email"
  label="邮箱"
  rules={[
    { required: true, message: '请输入邮箱' },
    { type: 'email', message: '请输入有效的邮箱地址' },
  ]}
>
  <Input />
</FormItem>
```

### 自定义验证

```tsx
<FormItem
  name="password"
  label="密码"
  rules={[
    {
      validator: (value) => {
        if (value.length < 6) {
          return '密码至少6个字符';
        }
        return true;
      },
    },
  ]}
>
  <Input type="password" />
</FormItem>
```

## 初始值

```tsx
<Form initialValues={{ username: 'admin', email: 'admin@example.com' }}>
  <FormItem name="username" label="用户名">
    <Input />
  </FormItem>
  <FormItem name="email" label="邮箱">
    <Input />
  </FormItem>
</Form>
```

## 表单实例方法

```tsx
import { useRef } from 'react';
import type { FormInstance } from '@l2ui/components';

function App() {
  const formRef = useRef<FormInstance>(null);

  const handleGetValues = () => {
    const values = formRef.current?.getFieldsValue();
    console.log(values);
  };

  const handleValidate = async () => {
    try {
      const values = await formRef.current?.validateFields();
      console.log('验证通过:', values);
    } catch {
      console.log('验证失败');
    }
  };

  return (
    <Form ref={formRef}>
      <FormItem name="username" label="用户名">
        <Input />
      </FormItem>
      <Button onClick={handleGetValues}>获取值</Button>
      <Button onClick={handleValidate}>验证</Button>
    </Form>
  );
}
```

## API

### FormProps

| 属性           | 说明                              | 类型                                                         | 默认值       |
| -------------- | --------------------------------- | ------------------------------------------------------------ | ------------ |
| layout         | 表单布局                          | `'horizontal' \| 'vertical' \| 'inline'`                     | `'vertical'` |
| labelWidth     | 标签宽度（horizontal 布局时有效） | `number \| string`                                           | -            |
| initialValues  | 初始值                            | `FormValues`                                                 | `{}`         |
| fields         | 表单字段配置                      | `FormField[]`                                                | `[]`         |
| onSubmit       | 提交回调                          | `(values: FormValues) => void \| Promise<void>`              | -            |
| onReset        | 重置回调                          | `() => void`                                                 | -            |
| onValuesChange | 值变化回调                        | `(changedValues: FormValues, allValues: FormValues) => void` | -            |

### FormItemProps

| 属性       | 说明                              | 类型               | 默认值  |
| ---------- | --------------------------------- | ------------------ | ------- |
| name       | 字段名                            | `string`           | -       |
| label      | 标签文本                          | `string`           | -       |
| rules      | 验证规则                          | `FormRule[]`       | `[]`    |
| required   | 是否必填（快捷方式）              | `boolean`          | `false` |
| labelWidth | 标签宽度（horizontal 布局时有效） | `number \| string` | -       |

### FormRule

| 属性      | 说明            | 类型                                                                                      | 默认值  |
| --------- | --------------- | ----------------------------------------------------------------------------------------- | ------- |
| required  | 是否必填        | `boolean`                                                                                 | `false` |
| message   | 错误提示信息    | `string`                                                                                  | -       |
| validator | 自定义验证函数  | `(value: any, formValues: FormValues) => boolean \| string \| Promise<boolean \| string>` | -       |
| pattern   | 正则表达式验证  | `RegExp`                                                                                  | -       |
| min       | 最小长度/最小值 | `number`                                                                                  | -       |
| max       | 最大长度/最大值 | `number`                                                                                  | -       |
| type      | 类型验证        | `'string' \| 'number' \| 'email' \| 'url'`                                                | -       |

### FormInstance

| 方法           | 说明             | 类型                                    |
| -------------- | ---------------- | --------------------------------------- |
| getFieldsValue | 获取所有字段值   | `() => FormValues`                      |
| getFieldValue  | 获取指定字段值   | `(name: string) => any`                 |
| setFieldValue  | 设置字段值       | `(name: string, value: any) => void`    |
| setFieldsValue | 设置多个字段值   | `(values: FormValues) => void`          |
| resetFields    | 重置表单         | `() => void`                            |
| validateFields | 验证所有字段     | `() => Promise<FormValues>`             |
| validateField  | 验证指定字段     | `(name: string) => Promise<any>`        |
| getFieldError  | 获取字段错误     | `(name: string) => string \| undefined` |
| getFieldsError | 获取所有字段错误 | `() => Record<string, string>`          |
| clearErrors    | 清除错误         | `(name?: string) => void`               |

## 特性

- ✅ 多种布局方式（垂直、水平、行内）
- ✅ 表单验证（必填、类型、正则、自定义）
- ✅ 表单实例方法
- ✅ 初始值支持
- ✅ 值变化监听
- ✅ 错误提示
- ✅ 主题定制
