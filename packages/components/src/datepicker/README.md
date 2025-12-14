# DatePicker 日期选择器

日期选择器组件，支持日历面板选择、受控/非受控模式、多种日期格式。

## 基本用法

```tsx
import { DatePicker } from '@l2ui/components';

function App() {
  return <DatePicker placeholder="请选择日期" />;
}
```

## 受控模式

```tsx
const [date, setDate] = useState<Date | null>(new Date());

<DatePicker value={date} onChange={(newDate, dateString) => setDate(newDate)} />;
```

## 非受控模式

```tsx
<DatePicker
  defaultValue={new Date()}
  onChange={(date, dateString) => console.log(date, dateString)}
/>
```

## 日期格式

```tsx
// YYYY-MM-DD (默认)
<DatePicker format="YYYY-MM-DD" />

// YYYY/MM/DD
<DatePicker format="YYYY/MM/DD" />

// DD-MM-YYYY
<DatePicker format="DD-MM-YYYY" />

// DD/MM/YYYY
<DatePicker format="DD/MM/YYYY" />
```

## 禁用状态

```tsx
<DatePicker disabled placeholder="禁用状态" />
```

## 不同尺寸

```tsx
<DatePicker size="small" />
<DatePicker size="medium" />
<DatePicker size="large" />
```

## API

### DatePickerProps

| 属性          | 说明                              | 类型                                               | 默认值         |
| ------------- | --------------------------------- | -------------------------------------------------- | -------------- |
| size          | 尺寸                              | `'small' \| 'medium' \| 'large'`                   | `'medium'`     |
| placeholder   | 占位提示                          | `string`                                           | `'请选择日期'` |
| disabled      | 是否禁用                          | `boolean`                                          | `false`        |
| block         | 是否块级，撑满容器宽度            | `boolean`                                          | `false`        |
| value         | 受控值（Date 对象或字符串）       | `Date \| string \| null`                           | -              |
| defaultValue  | 非受控初始值（Date 对象或字符串） | `Date \| string \| null`                           | -              |
| format        | 日期格式                          | `DateFormat`                                       | `'YYYY-MM-DD'` |
| onChange      | 值变化回调                        | `(date: Date \| null, dateString: string) => void` | -              |
| datePickerRef | 外部 ref 透传                     | `Ref<HTMLInputElement>`                            | -              |

### DateFormat

```tsx
type DateFormat = 'YYYY-MM-DD' | 'YYYY/MM/DD' | 'DD-MM-YYYY' | 'DD/MM/YYYY';
```

## 特性

- ✅ 受控/非受控模式
- ✅ 日历面板选择
- ✅ 多种日期格式
- ✅ 键盘导航支持
- ✅ 点击外部关闭
- ✅ 无障碍访问支持
- ✅ 主题定制
