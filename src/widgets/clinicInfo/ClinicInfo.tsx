import React from 'react';
import {Box, Button, Typography} from '@mui/material';
import {useEventsData} from '@box/shared/hooks';
import {ChoiceClinic} from '@box/entities/choiceClinic';
import {CabinetsTable} from '@box/feature/cabinetsTable';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import {ESettingsModals, settingSlice} from '@box/shared/store/reducers';
import {useAppDispatch, useAppSelector} from '@box/shared/store/hooks';
import {ERoles} from '@box/shared/models';

export const ClinicInfo = () => {
  const {clinicInfo, cabinets} = useEventsData();
  const dispatch = useAppDispatch();
  const {setModal} = settingSlice.actions;
  const {role} = useAppSelector((state) => state.userSlice);
  const redactorClinic = () => {
    dispatch(setModal(ESettingsModals.REDACTOR_CLINIC));
  };
  return (
    <Box sx={{p: 2}}>
      <ChoiceClinic />
      <Typography variant={'h5'} sx={{mt: 1}}>
        {clinicInfo?.title}
      </Typography>
      <Typography>Телефон {clinicInfo?.phone}</Typography>
      <Typography>
        Время работы {clinicInfo?.startOfTheDay} : {clinicInfo?.endOfTheDay}
      </Typography>
      {role !== ERoles.doctor && (
        <Button
          sx={{mt: 2}}
          onClick={redactorClinic}
          variant="outlined"
          endIcon={<EditRoundedIcon />}
        >
          Редактировать
        </Button>
      )}
      <CabinetsTable cabinets={cabinets} />
    </Box>
  );
};
