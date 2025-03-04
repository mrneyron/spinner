import React from 'react';

export type Theme = 'light' | 'dark';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export const drawerWidth = 240;

export const paletteTheme = {
  primary: {
    main: '#0090D3',
  },
  secondary: {
    main: '#a1b4d3',
  },
  error: {
    main: '#FFE5EE',
  },
  warning: {
    main: '#D7A019',
  },
  success: {
    main: '#5FE2BE',
  },
  info: {
    main: '#F1F5F9',
    light: '#fff',
    dark: '#677489',
  },
};

export const componentsTheme = {};

export const typographyTheme = {
  allVariants: {
    fontFamily: '"Golos Text", Tofu',
    // color: '#111729'
  },
};
