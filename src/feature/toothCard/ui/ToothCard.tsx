import React, {FC, useCallback, useMemo, useState} from 'react';
import {IDentalChart} from '@box/shared/models';
import {Box} from '@mui/system';
import {CircularProgress} from '@mui/material';
import {ToothServicesTable} from '@box/feature/toothCard/ui/ToothServicesTable';
import {TeethGrid} from '@box/entities/TeethGrid';

type Props = {
  dentalChart: IDentalChart | undefined;
};

export const TeethCard: FC<Props> = ({dentalChart}) => {
  const [currentTooth, setCurrentTooth] = useState<string>('');
  const activeTeeth = useMemo(() => {
    const ids = dentalChart?.teeth.map((el) => el.toothNumber) ?? [];
    return Array.from(new Set(ids));
  }, [dentalChart]);

  const currentToothInfo = useMemo(() => {
    return (
      dentalChart?.teeth.filter((el) => `${el.toothNumber}` === currentTooth) ??
      []
    );
  }, [currentTooth]);

  const toothPressHandler = useCallback((toothNumber: string) => {
    setCurrentTooth(toothNumber);
  }, []);

  if (!dentalChart) {
    return (
      <Box sx={{display: 'flex'}}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <TeethGrid
        activeTeeth={activeTeeth}
        currentTooth={currentTooth}
        toothPressHandler={toothPressHandler}
      />
      <ToothServicesTable toothInfo={currentToothInfo} />
    </>
  );
};
