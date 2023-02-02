import React from 'react';
import {Box, IconButton, Tooltip, Typography} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useEventsData} from '@box/shared/hooks';
import {ESettingsModals, settingSlice} from '@box/shared/store/reducers';
import {useAppDispatch} from '@box/shared/store/hooks';
import {StaffTable} from '@box/entities/staffTable';

export const DoctorsInfo = () => {
  const dispatch = useAppDispatch();
  const {doctors, administrators} = useEventsData();
  const {setModal} = settingSlice.actions;
  const addStuff = () => {
    dispatch(setModal(ESettingsModals.NEW_STUFF));
  };
  return (
    <Box sx={{p: 2}}>
      <Tooltip placement={'right'} title="Добавить сотрудника">
        <IconButton onClick={addStuff} color="primary" aria-label="add stuff">
          <AddCircleOutlineIcon fontSize={'large'} />
        </IconButton>
      </Tooltip>

      <StaffTable staff={doctors} title={'Врачи'} />
      <StaffTable
        staff={administrators}
        title={'Администраторы'}
        sx={{mt: 2}}
      />

      {doctors.map((doctor) => (
        <Box key={doctor.id} sx={{mt: 2}}>
          <Typography>{`${doctor.lastName} ${doctor.firstName} ${doctor.middleName}`}</Typography>
          <Typography>Специальность {doctor.speciality}</Typography>
          <Typography>Дата рождения{doctor.dateOfBirth}</Typography>
          <Typography>Телефон{doctor.phone}</Typography>
        </Box>
      ))}
    </Box>
  );
};
