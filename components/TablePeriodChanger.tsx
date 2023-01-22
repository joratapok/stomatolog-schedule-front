import React, {useCallback} from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import {eventSlice} from '../store/reducers/eventSlice';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {PaperCenter} from './UI/PaperCenter';
import {ContainerInline} from './UI/ContainerInline';
import {SelectContainer} from './UI/SelectContainer';
import {useEventsData} from '../hooks/useEventsData';
import {ChoiceClinic} from './UI/ChoiceClinic';

type ItemProps = {
  period: number;
  setPeriod: (period: number) => void;
  isActive: boolean;
};

const periods = [15, 30, 60];

const Item: React.FC<ItemProps> = ({period, setPeriod, isActive}) => {
  return (
    <Button
      sx={{marginLeft: 2}}
      onClick={() => setPeriod(period)}
      variant={isActive ? 'contained' : 'outlined'}
    >
      {period}
    </Button>
  );
};

export const TablePeriodChanger = () => {
  const dispatch = useAppDispatch();
  const {tablePeriod: currentPeriod} = useAppSelector(
    (state) => state.eventSlice
  );
  const {setTablePeriod} = eventSlice.actions;
  const setPeriod = useCallback((period: number) => {
    dispatch(setTablePeriod(period));
  }, []);
  return (
    <PaperCenter>
      <Typography variant={'h6'}>Шаг сетки расписания</Typography>
      <Box component={ContainerInline}>
        {periods.map((el) => (
          <Item
            key={el}
            period={el}
            setPeriod={setPeriod}
            isActive={el === currentPeriod}
          />
        ))}
      </Box>

      <ChoiceClinic />
    </PaperCenter>
  );
};
