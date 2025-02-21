import {
  type AlertProps,
  type ButtonPropsVariantOverrides,
} from '@mui/material';
import { type ButtonProps } from '@mui/material/Button';
import {
  type CSSObject,
  type Theme as MaterialTheme,
} from '@mui/material/styles';
import { type OverridableStringUnion } from '@mui/types';
import React from 'react';

export type Theme = 'light' | 'dark';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export const drawerWidth = 240;

export const palletteTheme = {
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

export const componentsTheme = {
  MuiAlert: {
    variants: [
      {
        props: { severity: 'notice' } as unknown as Partial<AlertProps>,
        style: ({ theme }: { theme: MaterialTheme }): CSSObject => ({
          position: 'absolute',
          top: '10px',
          right: '100px',
          border: '1px solid #E4A9A9',
          borderRadius: '11px',
          fontSize: '13px',
          backgroundColor:
            theme.palette.mode === 'light' ? 'transparent' : '#121212',
          '&.MuiPaper-root': {
            borderRadius: '11px',
            maxWidth: '330px',
            minWidth: '330px',
            boxShadow: 'none',
            padding: '0 16px',
          },
          '& .MuiAlert-icon': {
            padding: '12px 0',
          },
        }),
      },
    ],
  },
  MuiButton: {
    variants: [
      {
        props: {
          variant: 'main' as OverridableStringUnion<
            'main',
            ButtonPropsVariantOverrides
          >,
        } as unknown as Partial<ButtonProps>,
        style: ({ theme }: { theme: MaterialTheme }) =>
          ({
            fontFamily: 'Lexend, sans-serif',
            width: '178px',
            height: '41px',
            borderRadius: '10px',
            letterSpacing: '1px',
            fontSize: '16px',
            fontStyle: 'light',
            fontWeight: 300,
            textTransform: 'none',
            backgroundColor:
              theme.palette.mode === 'light' ? '#3354F4' : '#fff', // Используйте цвета из палитры
            color: theme.palette.mode === 'light' ? '#fff' : '#3354F4',
            '&:hover': {
              backgroundColor:
                theme.palette.mode === 'light' ? '#3354F4' : '#fff', // Можно использовать темный цвет при наведении
              color: theme.palette.mode === 'light' ? '#fff' : '#3354F4',
            },
          }) as CSSObject,
      },
    ],
    styleOverrides: {
      containedPrimary: {
        '&:hover': {
          backgroundColor: '#0090D3',
        },
        '&.Mui-disabled': {
          background: '#D7DDE4',
          color: '#fff',
        },
      },
      outlinedPrimary: {
        '&:hover': {
          backgroundColor: '#E6F0FC',
        },
        '&.Mui-disabled': {
          background: '#fff',
          color: '#B5C1D3',
          borderColor: '#B5C1D3',
        },
      },
      textPrimary: {
        backgroundColor: '#fff',
        borderBottom: '1px solid transparent',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        '&:hover': {
          backgroundColor: '#fff',
          borderBottom: '1px solid #0090D3',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
        '&.Mui-disabled': {
          color: '#B5C1D3',
        },
      },
      iconSizeSmall: {
        '& > *:first-of-type': {
          fontSize: 16,
        },
      },
      iconSizeMedium: {
        '& > *:first-of-type': {
          fontSize: 20,
        },
      },
      iconSizeLarge: {
        '& > *:first-of-type': {
          fontSize: 46,
        },
      },
    },
  },
  MuiSkeleton: {
    styleOverrides: {
      root: {
        backgroundColor: '#F6F7F9',
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        color: '#D7DDE4',
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: ({ theme }: { theme: MaterialTheme }): CSSObject => ({
        fontFamily: 'Lexend, sans-serif',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '17px',
        height: '60px',
        color: theme.palette.mode === 'light' ? '#252C58' : 'white',
      }),
    },
  },
};

export const typographyTheme = {
  allVariants: {
    fontFamily: '"Golos Text", Tofu',
    // color: '#111729'
  },
};
