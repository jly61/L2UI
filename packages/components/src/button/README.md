# Button 按钮

按钮用于触发一个操作。

## 基本用法

```tsx
import { Button } from '@l2ui/components';

function App() {
  return (
    <>
      <Button>默认按钮</Button>
      <Button type="primary">主要按钮</Button>
      <Button type="dashed">虚线按钮</Button>
      <Button type="link">链接按钮</Button>
      <Button type="text">文本按钮</Button>
    </>
  );
}
```

## 按钮尺寸

```tsx
<Button size="small">小按钮</Button>
<Button size="medium">中按钮</Button>
<Button size="large">大按钮</Button>
```

## 加载状态

```tsx
<Button loading>加载中</Button>
<Button loading type="primary">加载中</Button>
```

## 禁用状态

```tsx
<Button disabled>禁用按钮</Button>
<Button disabled type="primary">禁用按钮</Button>
```

## 危险按钮

```tsx
<Button danger>危险按钮</Button>
<Button danger type="primary">危险按钮</Button>
```

## 幽灵按钮

```tsx
<Button ghost>幽灵按钮</Button>
<Button ghost type="primary">幽灵按钮</Button>
```

## 块级按钮

```tsx
<Button block>块级按钮</Button>
```

## API

### Button Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 按钮类型 | `'default' \| 'primary' \| 'dashed' \| 'link' \| 'text'` | `'default'` |
| size | 按钮尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| loading | 加载状态 | `boolean` | `false` |
| block | 块级按钮 | `boolean` | `false` |
| danger | 危险按钮 | `boolean` | `false` |
| ghost | 幽灵按钮 | `boolean` | `false` |
| disabled | 禁用状态 | `boolean` | `false` |
| onClick | 点击事件 | `(e: React.MouseEvent<HTMLButtonElement>) => void` | - |

Button 支持所有原生 button 元素的属性。

