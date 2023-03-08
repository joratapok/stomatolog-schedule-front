import React, {useCallback} from 'react';
import {Box, Button, FormControlLabel, Checkbox} from '@mui/material';

import {ChoiceClinic} from '@box/entities/choiceClinic';
import {eventSlice} from '@box/shared/store/reducers';
import {useAppDispatch, useAppSelector} from '@box/shared/store/hooks';
import {PaperCenter, ContainerInline, TypoContent} from '@box/shared/ui';

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
  const {tablePeriod: currentPeriod, roundTheClock} = useAppSelector(
    (state) => state.eventSlice
  );
  const {setTablePeriod, setRoundTheClock} = eventSlice.actions;
  const setPeriod = useCallback((period: number) => {
    dispatch(setTablePeriod(period));
  }, []);
  const changeRoundTheClockMode = () => {
    dispatch(setRoundTheClock(!roundTheClock));
  };
  return (
    <PaperCenter>
      <TypoContent variant={'h6'}>Шаг сетки расписания</TypoContent>
      <Box component={ContainerInline}>
        {periods.map((period) => (
          <Item
            key={period}
            period={period}
            setPeriod={setPeriod}
            isActive={period === currentPeriod}
          />
        ))}
      </Box>

      <Box sx={{mt: 2}}>
        <FormControlLabel
          control={
            <Checkbox
              checked={roundTheClock}
              onChange={changeRoundTheClockMode}
            />
          }
          label={'Круглосуточный режим'}
        />
      </Box>

      <ChoiceClinic />
    </PaperCenter>
  );
};
