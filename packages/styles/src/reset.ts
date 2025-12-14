import { css } from 'styled-components';

/**
 * 全局样式重置
 * 基于 Normalize.css 和现代 CSS Reset 的最佳实践
 */
export const globalReset = css`
  /* 1. 使用更直观的盒模型 */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* 2. 移除默认边距 */
  * {
    margin: 0;
    padding: 0;
  }

  /* 3. HTML 和 Body 样式 */
  html {
    /* 启用平滑滚动 */
    scroll-behavior: smooth;
    /* 设置基础字体大小 */
    font-size: 16px;
    /* 防止 iOS 字体大小调整 */
    -webkit-text-size-adjust: 100%;
  }

  body {
    /* 继承字体 */
    font-family:
      -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    /* 改善字体渲染 */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* 文本渲染优化 */
    text-rendering: optimizeLegibility;
    /* 行高 */
    line-height: 1.5;
    /* 颜色 */
    color: #000000d9;
    background-color: #ffffff;
  }

  /* 4. 移除列表样式 */
  ol,
  ul {
    list-style: none;
  }

  /* 5. 图片和媒体元素 */
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
    height: auto;
  }

  /* 6. 表单元素 */
  input,
  button,
  textarea,
  select {
    font: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
  }

  /* 7. 链接样式 */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* 8. 标题样式 */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    line-height: 1.2;
  }

  /* 9. 代码元素 */
  code,
  kbd,
  samp,
  pre {
    font-family:
      'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
    font-size: 1em;
  }

  /* 10. 表格 */
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* 11. 隐藏元素 */
  [hidden] {
    display: none !important;
  }

  /* 12. 焦点样式 */
  :focus-visible {
    outline: 2px solid #1890ff;
    outline-offset: 2px;
  }

  /* 13. 禁用文本选择（可选，根据需要启用） */
  /* 
  * {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  */
`;
