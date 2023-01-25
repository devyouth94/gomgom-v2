import { DefaultTheme } from 'styled-components';

const color = {
  BLACK: '#1E1D1D', //figma Black
  WHITE: '#FFFEFC', //figma White

  BG: '#F8F3EB', //figma Bg

  MAIN_1: '#FF7A00', //figma Point color
  MAIN_2: '#FF9B25', //figma Main
  MAIN_3: '#FFAF51',
  MAIN_4: '#FFC076',

  SUB_1: '#74706A', //figma Dark Grey
  SUB_2: '#95918C', //figma Mid Grey
  SUB_3: '#B9B5B1', //figma Grey
  SUB_4: '#EBE5DD', //figma Light Grey
  SUB_5: '#E8E1D8', //figma Warm Grey

  WARN: '#EA4713',
};

const darkColor = {
  BLACK: color.WHITE,
  WHITE: color.BLACK,

  BG: '#333',
};

const device = {
  PC: `screen and (min-width: 768px)`,
};

const style = {
  WIDTH: '45rem',
  LEFT: '50%',
  TRANSFORM: 'translateX(-50%)',
};

export const defaultTheme: DefaultTheme = {
  color,
  device,
  style,
};

export const darkTheme: DefaultTheme = {
  ...defaultTheme,
  color: {
    ...color,
    ...darkColor,
  },
};

export type ColorTypes = typeof color;
export type DeviceTypes = typeof device;
export type StyleTypes = typeof style;
