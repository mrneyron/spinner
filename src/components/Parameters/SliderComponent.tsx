import { Slider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';
import {
  variantsBase,
  VariantType,
} from '../../store/parameters/model/types.tsx';
import Message from '../Message/index.tsx';

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
))((_theme) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 14,
  },
}));

export const SliderComponent = () => {
  const [param, setParam] = useLocalStorage<VariantType>(
    'params',
    variantsBase[0]
  );
  const [number, setNumber] = useState<number | null>(param?.id ?? null);
  const [openMessage, setOpenMessage] = useState<boolean>(false);

  useEffect(() => {
    if (!number) {
      const nowParameter = param;
      setNumber(nowParameter.id);
    }
  }, [number, param]);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    const num = newValue as number;
    setNumber(num);
    setParam(variantsBase[num - 1]);
    setOpenMessage(true);
  };

  const getText = () => {
    const nowParameter = param;
    return nowParameter.name;
  };

  return (
    <>
      <Typography gutterBottom>Уровень наёба</Typography>
      <CustomTooltip arrow title={param?.description}>
        <Slider
          defaultValue={1}
          value={number as number}
          sx={{ maxWidth: '100%' }}
          valueLabelFormat={getText}
          getAriaValueText={getText}
          shiftStep={1}
          step={1}
          marks
          min={1}
          max={5}
          valueLabelDisplay="on"
          onChange={handleChange}
        />
      </CustomTooltip>
      <Message
        title={'Настройки уровня наёба сохранены: '}
        message={`${param.name} (${param.description})`}
        severity="success"
        variant={'filled'}
        open={openMessage}
        setOpen={setOpenMessage}
      />
    </>
  );
};
