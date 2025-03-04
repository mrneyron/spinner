import { IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useLocalStorage } from '../../hooks/useLocalStorageString.ts';
import Message from '../Message/index.tsx';

type ThemeSwitcherProps = {
  colorMode: { toggleColorMode: () => void };
};

export const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  const [storageTheme, setStorageTheme] = useLocalStorage('theme', 'dark');
  const [openMessage, setOpenMessage] = useState<boolean>(false);

  const handleSwitchTheme = () => {
    const nowTheme = storageTheme === 'dark' ? 'light' : 'dark';
    setStorageTheme(nowTheme);
    props.colorMode.toggleColorMode();
    setOpenMessage(true);
  };

  return (
    <>
      <Tooltip placement={'top'} title={'Сменить тему'}>
        <IconButton onClick={() => handleSwitchTheme()}>
          {storageTheme === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Tooltip>
      <Message
        title={'Настройки темы сохранены: '}
        message={`${storageTheme}`}
        severity="success"
        variant={'filled'}
        open={openMessage}
        setOpen={setOpenMessage}
      />
    </>
  );
};
