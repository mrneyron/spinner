import { Box, Paper, Typography, useTheme } from '@mui/material';
import { GiftType } from '../../store/parameters/model/types';

type CardForUserProps = {
  item: GiftType;
  open: boolean;
  index: number;
  handleItemClick: (id: number) => void;
};

export const CardForUser = ({
  item,
  open,
  index,
  handleItemClick,
}: CardForUserProps) => {
  const theme = useTheme();

  return (
    <Paper
      className="card"
      elevation={3}
      sx={{
        width: '200px',
        height: '320px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onClick={() => handleItemClick(index)}
    >
      {open ? (
        <Box
          sx={{
            height: '280px',
            width: '160px',
            backgroundColor: theme.palette.background.paper,
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant={'h6'}>{index}</Typography>
          <Typography sx={{ p: 1, wordBreak: 'break-all' }} variant={'h6'}>
            {item.name ?? 'Пусто'}
          </Typography>
          <Typography sx={{ p: 1, wordBreak: 'break-all' }} variant={'h6'}>
            {item.description}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            fontSize: '72px',
            fontFamily: "'Golos Text', serif",
            color: '#121212',
            textShadow:
              '-1px 0  #ffd400, 0 1px  #ffd400, 1px 0  #ffd400, 0 -1px  #ffd400',
          }}
        >
          {index}
        </Box>
      )}
    </Paper>
  );
};
