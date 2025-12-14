# Select 选择器

下拉选择器组件，支持单选、受控/非受控模式。

## 基本用法

```tsx
import { Select } from '@l2ui/components';

const options = [
  { value: '1', label: '选项一' },
  { value: '2', label: '选项二' },
  { value: '3', label: '选项三' },
];

function App() {
  return <Select options={options} placeholder="请选择" />;
}
```

## 受控模式

```tsx
const [value, setValue] = useState('1');

<Select options={options} value={value} onChange={(val, option) => setValue(val)} />;
```

## 非受控模式

```tsx
<Select options={options} defaultValue="1" onChange={(val, option) => console.log(val, option)} />
```

## API

### SelectProps

| 属性         | 说明                   | 类型                                                      | 默认值     |
| ------------ | ---------------------- | --------------------------------------------------------- | ---------- |
| options      | 选项列表               | `SelectOption[]`                                          | `[]`       |
| size         | 尺寸                   | `'small' \| 'medium' \| 'large'`                          | `'medium'` |
| placeholder  | 占位提示               | `string`                                                  | `'请选择'` |
| disabled     | 是否禁用               | `boolean`                                                 | `false`    |
| block        | 是否块级，撑满容器宽度 | `boolean`                                                 | `false`    |
| value        | 受控值                 | `string \| number`                                        | -          |
| defaultValue | 非受控初始值           | `string \| number`                                        | -          |
| onChange     | 值变化回调             | `(value: string \| number, option: SelectOption) => void` | -          |
| selectRef    | 外部 ref 透传          | `Ref<HTMLDivElement>`                                     | -          |
| className    | 自定义类名             | `string`                                                  | -          |
| style        | 自定义样式             | `React.CSSProperties`                                     | -          |

### SelectOption

| 属性     | 说明     | 类型               | 默认值  |
| -------- | -------- | ------------------ | ------- |
| value    | 选项值   | `string \| number` | -       |
| label    | 选项标签 | `string`           | -       |
| disabled | 是否禁用 | `boolean`          | `false` |

## 特性

- ✅ 受控/非受控模式
- ✅ 键盘导航（Enter、Escape）
- ✅ 点击外部关闭
- ✅ 禁用选项支持
- ✅ 无障碍访问支持
- ✅ 主题定制
