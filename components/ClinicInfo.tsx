import React from 'react';
import {Typography} from '@mui/material';
import {useEventsData} from '../hooks/useEventsData';
import {ChoiceClinic} from './UI/ChoiceClinic';

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
