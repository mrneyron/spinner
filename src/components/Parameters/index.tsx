import { Box, Grid, Divider, Button } from '@mui/material';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';
import { SliderComponent } from './SliderComponent.tsx';
import { ThemeSwitcher } from './ThemeSwitcher.tsx';
import { Adding } from './Adding.tsx';
import { DraggableList } from './DraggableList.tsx';
import {
  ListGifts,
  variantsBase,
  VariantType,
} from '../../store/parameters/model/types.tsx';
import { GiftListOpened } from './List.tsx';

type ParamsComponentProps = {
  colorMode: { toggleColorMode: () => void };
};

export const ParamsComponent = (props: ParamsComponentProps) => {
  const [param] = useLocalStorage<VariantType>('params', variantsBase[0]);
  const [listStorage, , removeList] = useLocalStorage<ListGifts>('list', []);

  return (
    <Box sx={{ mt: 4, mb: 4, ml: 5, mr: 5, minWidth: '94.7vw' }}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container sx={{ alignItems: 'center' }}>
            <Grid item xs={12} sm={8}>
              <SliderComponent />
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
              <ThemeSwitcher colorMode={props.colorMode} />
            </Grid>
          </Grid>
          <Divider sx={{ mb: 2, mt: 1 }} />
        </Grid>
        <Grid item xs={12}>
          <Adding />
          <Divider sx={{ mb: 2, mt: 1 }} />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          {(param.id === 1 || param.id === 2 || param.id === 5) && (
            <>
              <GiftListOpened isCanDrag={false} listStorage={listStorage} />
            </>
          )}
          {(param.id === 4 || param.id === 3) && (
            <>
              <DraggableList />
            </>
          )}
        </Grid>
        <Grid item xs={12}>
          {listStorage.length > 0 && (
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button variant={'outlined'} onClick={() => removeList()}>
                Удалить все карточки
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
