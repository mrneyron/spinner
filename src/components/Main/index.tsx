import './main.css';
import { Box, useMediaQuery } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ruRU } from '@mui/x-data-grid';
import CssBaseline from '@mui/material/CssBaseline';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect, useMemo, useState } from 'react';
import {
  componentsTheme,
  typographyTheme,
  ColorModeContext,
} from '../../types/types';
import 'dayjs/locale/ru';
import { ParamsComponent } from '../Parameters';
import { useLocalStorage } from '../../hooks/useLocalStorageString';
import { Spinner } from '../Spinner';
import { Routes, Route, NavLink } from 'react-router';

export default function Main() {
  // В хроме с тёмной темой могут быть проблемы. исправление:
  // DevTools => More Tools => Rendering => спускаемся к Emulate CSS media feature prefers-color-scheme => ставим нужную тему
  const isSystemDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [storageTheme, setStorageTheme] = useLocalStorage(
    'theme',
    isSystemDark ? 'dark' : 'light'
  );
  const [mode, setMode] = useState<'light' | 'dark'>(
    (storageTheme as 'light' | 'dark' | undefined) !== undefined
      ? (storageTheme as 'light' | 'dark')
      : isSystemDark
        ? 'dark'
        : 'light'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    setStorageTheme(mode);
  }, [mode, setStorageTheme]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        setStorageTheme(storageTheme === 'light' ? 'dark' : 'light');
      },
    }),
    [setStorageTheme, storageTheme]
  );

  dayjs.extend(customParseFormat);

  const theme = useMemo(
    () =>
      createTheme(
        {
          typography: typographyTheme,
          palette: {
            mode,
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
        <CssBaseline />
        <Box>
          <div style={{ display: 'none' }}>
            <nav>
              <ul>
                <li>
                  <NavLink to="/" end>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/params" end>
                    Params
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <Routes>
            <Route index element={<Spinner />} />
            <Route
              path="params"
              element={<ParamsComponent colorMode={colorMode} />}
            />
          </Routes>
          <Box sx={{ display: 'none' }}></Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
