import { Box, Button, TextField } from '@mui/material';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';
import { useState } from 'react';
import { ListGifts } from '../../store/parameters/model/types.tsx';
import Message from '../Message/index.tsx';

export const Adding = () => {
  const [listStorage, setListStorage] = useLocalStorage<ListGifts>('list', []);
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [openMessage, setOpenMessage] = useState<boolean>(false);

  const addToArray = (array: ListGifts) => {
    for (let i = array.length + 1; i < 11; i++) {
      const emptyItem = {
        id: i,
        name: 'Пусто',
        description: '',
        order: i,
      };
      array.push(emptyItem);
    }
    setListStorage(array);
    setName('');
    setDesc('');
  };

  const onAdd = () => {
    const notEmptyList = listStorage.filter((item) => item.name !== 'Пусто');
    const newItem = {
      id: notEmptyList.length + 1,
      name,
      description: desc,
      order: notEmptyList.length + 1,
    };
    notEmptyList.push(newItem);
    setOpenMessage(true);
    addToArray(notEmptyList);
  };
  return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ mr: 2, mb: 2 }}>
          <TextField
            size={'small'}
            label={'Название'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box sx={{ mr: 2, mb: 2 }}>
          <TextField
            size={'small'}
            label={'Описание'}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Box>
        <Box sx={{ mr: 2, mb: 2 }}>
          <Button
            variant={'contained'}
            disabled={name.length === 0 || desc.length === 0}
            onClick={() => onAdd()}
            sx={{ minWidth: '220px' }}
          >
            Добавить
          </Button>
        </Box>
      </Box>
      <Message
        title={'Подарок добавлен '}
        message={''}
        severity="success"
        variant={'filled'}
        open={openMessage}
        setOpen={setOpenMessage}
      />
    </Box>
  );
};
