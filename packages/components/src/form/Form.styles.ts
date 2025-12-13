import styled, { css } from 'styled-components';
import type { FormLayout } from './Form.types';

interface StyledFormProps {
  $layout: FormLayout;
}

export const StyledForm = styled.form<StyledFormProps>`
  width: 100%;
  ${(props) => {
    switch (props.$layout) {
      case 'inline':
        return css`
          display: inline-flex;
          flex-wrap: wrap;
          align-items: flex-start;
          gap: 16px;
        `;
      case 'horizontal':
        return css`
          display: flex;
          flex-direction: column;
          gap: 24px;
        `;
      default:
        return css`
          display: flex;
          flex-direction: column;
          gap: 24px;
        `;
    }
  }}
`;

export const StyledFormItem = styled.div<{
  $layout: FormLayout;
  $labelWidth?: number | string;
}>`
  ${(props) => {
    if (props.$layout === 'inline') {
      return css`
        display: inline-flex;
        align-items: center;
        gap: 8px;
      `;
    }
    if (props.$layout === 'horizontal') {
      return css`
        display: flex;
        align-items: flex-start;
        gap: 16px;
      `;
    }
    return css`
      display: flex;
      flex-direction: column;
      gap: 8px;
    `;
  }}
`;

export const StyledFormLabel = styled.label<{
  $layout: FormLayout;
  $labelWidth?: number | string;
  $required: boolean;
}>`
  color: ${(props) => props.theme.colors?.text || '#000'};
  font-size: 14px;
  font-weight: 500;
  user-select: none;
  flex-shrink: 0;

  ${(props) => {
    if (props.$layout === 'horizontal') {
      const width = props.$labelWidth || '100px';
      return css`
        width: ${typeof width === 'number' ? `${width}px` : width};
        text-align: right;
        padding-top: 6px;
      `;
    }
    if (props.$layout === 'inline') {
      return css`
        margin-right: 0;
      `;
    }
    return css`
      margin-bottom: 0;
    `;
  }}

  ${(props) =>
    props.$required &&
    css`
      &::before {
        content: '*';
        color: ${props.theme.colors?.error || '#ff4d4f'};
        margin-right: 4px;
      }
    `}
`;

export const StyledFormControl = styled.div<{ $layout: FormLayout }>`
  flex: 1;
  min-width: 0;

  ${(props) =>
    props.$layout === 'inline' &&
    css`
      flex: 0 0 auto;
    `}
`;

export const StyledFormError = styled.div`
  margin-top: 4px;
  color: ${(props) => props.theme.colors?.error || '#ff4d4f'};
  font-size: 12px;
  line-height: 1.5;
  min-height: 20px;
`;

