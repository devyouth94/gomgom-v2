import 'styled-components';
import { ColorTypes, DeviceTypes } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: ColorTypes;
    device: DeviceTypes;
  }
}
