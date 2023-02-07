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
      <Box display="flex" justifyContent="flex-end" sx={{mb: 1}}>
        <Tooltip placement={'left'} title="Добавить сотрудника">
          <IconButton onClick={addStuff} color="primary" aria-label="add stuff">
            <AddCircleOutlineIcon fontSize={'large'} />
          </IconButton>
        </Tooltip>
      </Box>

      <StaffTable staff={doctors} title={'Врачи'} />
      <StaffTable
        staff={administrators}
        title={'Администраторы'}
        sx={{mt: 2}}
      />
    </Box>
  );
};
