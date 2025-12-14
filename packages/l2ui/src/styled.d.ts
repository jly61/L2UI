import 'styled-components';
import type { Theme } from '@l2ui/styles';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
