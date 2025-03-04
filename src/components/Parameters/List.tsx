import { Box } from '@mui/material';
import { Card } from '../Card';
import { ListGifts } from '../../store/parameters/model/types';

type GiftListOpenedProps = {
  listStorage: ListGifts;
  isCanDrag: boolean;
};

export const GiftListOpened = ({
  listStorage,
  isCanDrag,
}: GiftListOpenedProps) => {
  return (
    <Box
      sx={{
        mt: 2,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
        gap: '32px',
        maxWidth: '1128px',
      }}
    >
      {listStorage.map((item, index) => (
        <Card
          key={item.id}
          item={item}
          isCanDrag={isCanDrag}
          open
          index={index + 1}
        />
      ))}
    </Box>
  );
};
