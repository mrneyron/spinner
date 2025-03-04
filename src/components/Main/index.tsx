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
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

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
          <Router>
            <div style={{ display: 'none' }}>
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/params">Params</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <Routes>
              <Route
                path="/params"
                element={<ParamsComponent colorMode={colorMode} />}
              />
              <Route path="/" element={<Spinner />} />
            </Routes>
            <Box sx={{ display: 'none' }}></Box>
          </Router>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
