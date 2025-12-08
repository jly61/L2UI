# @l2ui/utils

L2UI 工具函数包，提供通用的工具方法。

## 安装

```bash
pnpm add @l2ui/utils
```

## 使用

```tsx
import { isString, formatNumber } from '@l2ui/utils';

if (isString(value)) {
  console.log('是字符串');
}

const formatted = formatNumber(1234567); // "1,234,567"
```

## API

### 类型判断

- `isUndefined(value)` - 判断是否为 undefined
- `isNull(value)` - 判断是否为 null
- `isNil(value)` - 判断是否为 null 或 undefined
- `isString(value)` - 判断是否为字符串
- `isNumber(value)` - 判断是否为数字
- `isBoolean(value)` - 判断是否为布尔值
- `isFunction(value)` - 判断是否为函数
- `isObject(value)` - 判断是否为对象
- `isArray(value)` - 判断是否为数组
- `isEmpty(value)` - 判断是否为空

### 格式化

- `formatFileSize(bytes)` - 格式化文件大小
- `formatNumber(num)` - 格式化数字（千分位）
- `formatPercent(value, decimals)` - 格式化百分比

### DOM 工具

- `getElement(selector)` - 获取元素
- `addClass(element, className)` - 添加类名
- `removeClass(element, className)` - 移除类名
- `toggleClass(element, className)` - 切换类名
- `hasClass(element, className)` - 检查类名

