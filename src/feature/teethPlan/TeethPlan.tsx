import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {Box} from '@mui/system';
import {Button, CircularProgress, TextField} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {TeethGrid} from '@box/entities/TeethGrid';
import {ITreatmentPlan} from '@box/shared/models';
import {usePatchClientMutation} from '@box/shared/store/services';
import {PlanPresent} from './ui/PlanPresent';

type Props = {
  treatmentPlan: ITreatmentPlan[];
  clientId: number;
};

export const TeethPlan: FC<Props> = ({treatmentPlan, clientId}) => {
  const [currentTooth, setCurrentTooth] = useState<string>('');
  const [currentPlan, setCurrentPlan] = useState<string>('');
  const [isStateChanged, setIsStateChanged] = useState(false);
  const [patchProfile, {isLoading, isSuccess}] = usePatchClientMutation();
  const activeTeeth = useMemo(() => {
    return treatmentPlan?.map((el) => el.tooth) ?? [];
  }, [treatmentPlan]);

  const currentToothPlan = useMemo(() => {
    return (
      treatmentPlan?.find((el) => `${el.tooth}` === currentTooth)?.plan ?? ''
    );
  }, [currentTooth]);

  const toothPressHandler = useCallback((toothNumber: string) => {
    setCurrentTooth((prev) => (prev === toothNumber ? '' : toothNumber));
  }, []);

  const newPlanRequest = useCallback(
    (plan: string) => {
      const toothPlan = {tooth: Number(currentTooth), plan};
      let newPlan;
      const teethInTreatmentPlan = treatmentPlan?.map((el) => `${el.tooth}`);
      if (!plan.length) {
        newPlan = treatmentPlan.filter(
          (el) => el.tooth !== Number(currentTooth)
        );
      } else if (teethInTreatmentPlan?.includes(currentTooth)) {
        newPlan = treatmentPlan?.map((el) => {
          if (`${el.tooth}` !== currentTooth) {
            return el;
          }
          return {tooth: el.tooth, plan};
        });
      } else {
        newPlan = [...treatmentPlan, toothPlan];
      }
      patchProfile({id: clientId, treatmentPlan: newPlan});
    },
    [currentTooth, treatmentPlan]
  );

  const clearButtonHandler = () => {
    setCurrentPlan('');
    setIsStateChanged(true);
  };

  useEffect(() => {
    if (currentTooth) {
      setCurrentPlan(currentToothPlan);
    }
  }, [currentTooth]);

  useEffect(() => {
    if (isSuccess) {
      setIsStateChanged(false);
      setCurrentTooth('');
      setCurrentPlan('');
    }
  }, [isSuccess]);

  if (!treatmentPlan) {
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
      {currentTooth && (
        <Box
          display={'flex'}
          flexDirection={'column'}
          sx={{maxWidth: 700, mt: 2}}
        >
          <TextField
            value={currentPlan}
            onChange={(e) => {
              if (!isStateChanged) {
                setIsStateChanged(true);
              }
              setCurrentPlan(e.currentTarget.value);
            }}
            label="План лечения"
            multiline
            rows={3}
          />
          <Box display={'flex'} justifyContent={'flex-end'} sx={{mt: 1}}>
            <Button disabled={!currentPlan.length} onClick={clearButtonHandler}>
              Очистить
            </Button>
            <LoadingButton
              loading={isLoading}
              disabled={!isStateChanged}
              onClick={() => newPlanRequest(currentPlan)}
            >
              Сохранить
            </LoadingButton>
          </Box>
        </Box>
      )}
      <PlanPresent teethPlan={treatmentPlan} />
    </>
  );
};
