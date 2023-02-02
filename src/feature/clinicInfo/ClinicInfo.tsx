import React from 'react';
import {Typography} from '@mui/material';
import {useEventsData} from '@box/shared/hooks';
import {ChoiceClinic} from '@box/entities/choiceClinic';

export const ClinicInfo = () => {
  const {clinicInfo} = useEventsData();
  return (
    <>
      <ChoiceClinic />
      <Typography>{clinicInfo?.title}</Typography>
      <Typography>Телефон {clinicInfo?.phone}</Typography>
      <Typography>
        Время работы {clinicInfo?.startOfTheDay} : {clinicInfo?.endOfTheDay}
      </Typography>
    </>
  );
};
