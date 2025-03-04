import { Box, Button, Typography } from '@mui/material';
import './styles.scss';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';
import { CardForUser } from '../CardForUser';
import {
  ListGifts,
  variantsBase,
  VariantType,
} from '../../store/parameters/model/types.tsx';
import { useState } from 'react';
import { shuffle } from './utils.ts';

export const Spinner = () => {
  const [param] = useLocalStorage<VariantType>('params', variantsBase[0]);
  const [listStorage] = useLocalStorage<ListGifts>('list', []);
  const [opened, setOpened] = useState(-1);
  const [openAll, setOpenAll] = useState(false);

  const [sorted, setSorted] = useState<ListGifts>(listStorage);

  const handleItemClick = (id: number) => {
    switch (param.id) {
      case 1: {
        // Рандом
        const sorting = shuffle(listStorage);
        setSorted(sorting);
        break;
      }
      case 2: {
        // Псевдо-рандом
        const sorting = shuffle(listStorage);
        setSorted(sorting);
        break;
      }
      case 3: {
        // Настраиваемый
        setSorted(listStorage);
        break;
      }
      case 4: {
        // Настраиваемый+
        setSorted(listStorage);
        break;
      }
      case 5: {
        // Хуй вам, а не приз
        if (listStorage[id - 1].name !== 'Пусто') {
          const array = structuredClone(listStorage);
          const findedEmptyIndex = array.findIndex(
            (item) => item.name === 'Пусто'
          );
          if (findedEmptyIndex !== -1) {
            [array[findedEmptyIndex], array[id - 1]] = [
              array[id - 1],
              array[findedEmptyIndex],
            ];
          }
          setSorted(array);
        } else {
          setSorted(listStorage);
        }
        break;
      }
      default:
        setSorted(listStorage);
        break;
    }
    if (opened === id) {
      setOpened(-1);
    } else {
      setOpened(id);
    }
  };

  const onClick = () => {
    const copy = shuffle(listStorage);
    console.log('listStorage', listStorage);
    console.log('copy', copy);
  };

  const handleOpenAll = () => {
    setOpenAll(!openAll);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box>
        <Typography variant="h6">Spinner</Typography>
      </Box>
      <Box
        sx={{
          mt: 2,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
          gap: '32px',
          maxWidth: '1128px',
        }}
      >
        {sorted.map((item, index) => {
          const isOpen = openAll ? openAll : opened === index + 1;
          return (
            <CardForUser
              item={item}
              handleItemClick={handleItemClick}
              open={isOpen}
              key={item.id}
              index={index + 1}
            />
          );
        })}
      </Box>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button sx={{ minWidth: '200px' }} onClick={handleOpenAll}>
          {openAll ? 'Скрыть все' : 'Открыть все'}
        </Button>
      </Box>
      <div style={{ display: 'none' }}>
        <Button onClick={onClick}>TEST</Button>
      </div>
    </Box>
  );
};
