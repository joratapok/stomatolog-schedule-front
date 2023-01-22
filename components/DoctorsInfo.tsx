import React from 'react';
import {Box, IconButton, Tooltip, Typography} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useEventsData} from '../hooks/useEventsData';
import {ESettingsModals, settingSlice} from '../store/reducers/settingSlice';
import {useAppDispatch} from '../hooks/redux';

export const DoctorsInfo = () => {
  const dispatch = useAppDispatch();
  const {doctors} = useEventsData();
  const {setModal} = settingSlice.actions;
  const addStuff = () => {
    dispatch(setModal(ESettingsModals.NEW_STUFF));
  };
  return (
    <>
      <Tooltip placement={'right'} title="Добавить врача">
        <IconButton onClick={addStuff} color="primary" aria-label="add stuff">
          <AddCircleOutlineIcon fontSize={'large'} />
        </IconButton>
      </Tooltip>
      {doctors.map((doctor) => (
        <Box key={doctor.id} sx={{mt: 2}}>
          <Typography>{`${doctor.lastName} ${doctor.firstName} ${doctor.middleName}`}</Typography>
          <Typography>Специальность {doctor.speciality}</Typography>
          <Typography>Дата рождения{doctor.dateOfBirth}</Typography>
          <Typography>Телефон{doctor.phone}</Typography>
        </Box>
      ))}
    </>
  );
};
