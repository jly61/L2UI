# Checkbox 复选框

复选框组件，支持受控/非受控、不确定状态。

## 基本用法

```tsx
import { Checkbox } from '@l2ui/components';

function App() {
  return <Checkbox>复选框</Checkbox>;
}
```

## 受控模式

```tsx
const [checked, setChecked] = useState(false);

<Checkbox
  checked={checked}
  onChange={(checked) => setChecked(checked)}
>
  受控复选框
</Checkbox>
```

## 非受控模式

```tsx
<Checkbox
  defaultChecked={false}
  onChange={(checked) => console.log(checked)}
>
  非受控复选框
</Checkbox>
```

## 不确定状态

```tsx
<Checkbox indeterminate>
  不确定状态
</Checkbox>
```

## 禁用状态

```tsx
<Checkbox disabled>禁用复选框</Checkbox>
<Checkbox disabled defaultChecked>禁用已选中</Checkbox>
```

## 不同尺寸

```tsx
<Checkbox size="small">小号</Checkbox>
<Checkbox size="medium">中号</Checkbox>
<Checkbox size="large">大号</Checkbox>
```

## 复选框组

```tsx
const [checkedList, setCheckedList] = useState<string[]>([]);

const options = [
  { value: 'apple', label: '苹果' },
  { value: 'banana', label: '香蕉' },
];

{options.map((option) => (
  <Checkbox
    key={option.value}
    checked={checkedList.includes(option.value)}
    onChange={(checked) => {
      if (checked) {
        setCheckedList([...checkedList, option.value]);
      } else {
        setCheckedList(checkedList.filter(item => item !== option.value));
      }
    }}
  >
    {option.label}
  </Checkbox>
))}
```

## API

### CheckboxProps

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| checked | 是否选中（受控） | `boolean` | - |
| defaultChecked | 是否默认选中（非受控） | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| indeterminate | 是否不确定状态 | `boolean` | `false` |
| onChange | 变化回调 | `(checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void` | - |
| children | 标签文本 | `ReactNode` | - |

## 特性

- ✅ 受控/非受控模式
- ✅ 不确定状态支持
- ✅ 键盘导航支持
- ✅ 无障碍访问支持
- ✅ 主题定制
- ✅ 多种尺寸

