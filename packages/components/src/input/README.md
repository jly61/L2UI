# Input 输入框

基础文本输入框，支持受控/非受控、尺寸、禁用与块级模式。

## 基本用法

```tsx
import { Input } from '@l2ui/components';

function Demo() {
  return <Input placeholder="请输入" />;
}
```

## 尺寸

```tsx
<Input size="small" placeholder="小号" />
<Input size="medium" placeholder="中号" />
<Input size="large" placeholder="大号" />
```

## 受控模式

```tsx
const [value, setValue] = useState('受控值');
<Input value={value} onChange={(e) => setValue(e.target.value)} />;
```

## 块级 & 禁用

```tsx
<Input block placeholder="占满宽度" />
<Input disabled placeholder="禁用状态" />
```

## API

| 属性         | 说明                   | 类型                                         | 默认值     |
| ------------ | ---------------------- | -------------------------------------------- | ---------- |
| value        | 受控值                 | `string`                                     | -          |
| defaultValue | 非受控初始值           | `string`                                     | -          |
| placeholder  | 占位提示               | `string`                                     | `'请输入'` |
| disabled     | 是否禁用               | `boolean`                                    | `false`    |
| size         | 尺寸                   | `'small' \| 'medium' \| 'large'`             | `'medium'` |
| block        | 是否块级，占满容器宽度 | `boolean`                                    | `false`    |
| onChange     | 值变化回调             | `(e: ChangeEvent<HTMLInputElement>) => void` | -          |
| inputRef     | 透传 ref               | `Ref<HTMLInputElement>`                      | -          |

> 支持所有原生 `input` 属性（通过继承 `InputHTMLAttributes`）。
