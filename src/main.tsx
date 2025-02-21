import './main.css';
import DateToNumber from './components/DateToNumber';
import { List } from './components/List/';
import { MyTasks } from './components/Task/';
import { Box, useMediaQuery } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ruRU } from '@mui/x-data-grid';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useMemo, useState } from 'react';
import {
  componentsTheme,
  palletteTheme,
  typographyTheme,
  ColorModeContext,
} from './types/types';
import 'dayjs/locale/ru';

function main() {
  // В хроме с тёмной темой могут быть проблемы. исправление:
  // DevTools => More Tools => Rendering => спускаемся к Emulate CSS media feature prefers-color-scheme => ставим нужную тему
  const isSystemDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>(
    isSystemDark ? 'dark' : 'light'
  );
  document.documentElement.setAttribute('data-theme', mode);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  dayjs.extend(customParseFormat);

  const theme = useMemo(
    () =>
      createTheme(
        {
          typography: typographyTheme,
          palette: {
            mode,
            ...palletteTheme,
          },
          components: componentsTheme,
        },
        ruRU
      ),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
          <Box sx={{ minWidth: 'calc(100vw - 48px)' }}>
            <Box sx={{ display: 'none' }}>
              <List />
              <DateToNumber />
            </Box>
            <Box sx={{ width: '100%' }}>
              <MyTasks />
            </Box>
          </Box>
        </LocalizationProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default main;
