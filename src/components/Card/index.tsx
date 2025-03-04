import {
  Box,
  Paper,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties, HTMLAttributes } from 'react';
import { GiftType } from '../../store/parameters/model/types';

type CardProps = {
  item: GiftType;
  isCanDrag: boolean;
  open?: boolean;
  isDragging?: boolean;
  style?: SxProps<Theme>;
  index?: number;
} & HTMLAttributes<HTMLDivElement>;

export const Card = ({
  item,
  open,
  isCanDrag,
  style,
  index,
  isDragging: drag,
  ...props
}: CardProps) => {
  const theme = useTheme();
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: item?.id,
  });

  const styles = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  const sx: CSSProperties = {
    opacity: isDragging ? '0.4' : '1',
    cursor: isCanDrag ? (drag ? 'grabbing' : 'grab') : 'no-drop',
    lineHeight: '0.5',
    ...styles,
  };

  return (
    <div ref={setNodeRef} style={sx} {...props} {...attributes} {...listeners}>
      <Paper
        className="card"
        elevation={3}
        sx={{
          width: '200px',
          height: '320px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...style,
        }}
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
    </div>
  );
};
