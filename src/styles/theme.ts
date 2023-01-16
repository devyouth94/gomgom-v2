import { DefaultTheme } from 'styled-components';

const color = {
  BLACK: '#1E1D1D', //figma Black
  WHITE: '#FFFEFC', //figma White

  BG: '#F8F3EB', //figma Bg
};

const darkColor = {
  BLACK: color.WHITE,
  WHITE: color.BLACK,

  BG: '#333',
};

export const defaultTheme: DefaultTheme = {
  color,
};

export const darkTheme: DefaultTheme = {
  color: {
    ...color,
    ...darkColor,
  },
};

export type ColorTypes = typeof color;
