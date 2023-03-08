import React from 'react';
import {Box, IconButton, Tooltip} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useEventsData} from '@box/shared/hooks';
import {ESettingsModals, settingSlice} from '@box/shared/store/reducers';
import {useAppDispatch, useAppSelector} from '@box/shared/store/hooks';
import {StaffTable} from '@box/entities/staffTable';
import {ERoles} from '@box/shared/models';

export const DoctorsInfo = () => {
  const dispatch = useAppDispatch();
  const {doctors, administrators} = useEventsData();
  const {setModal} = settingSlice.actions;
  const {role} = useAppSelector((state) => state.userSlice);
  const addStuff = () => {
    dispatch(setModal(ESettingsModals.NEW_STUFF));
  };
  return (
    <Box sx={{p: 2}}>
      {role !== ERoles.doctor && (
        <Box display="flex" justifyContent="flex-end" sx={{mb: 1}}>
          <Tooltip placement={'left'} title="Добавить сотрудника">
            <IconButton
              onClick={addStuff}
              color="primary"
              aria-label="add stuff"
            >
              <AddCircleOutlineIcon fontSize={'large'} />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      <StaffTable
        isAdmin={role !== ERoles.doctor}
        staff={doctors}
        title={'Врачи'}
      />
      <StaffTable
        isAdmin={role !== ERoles.doctor}
        staff={administrators}
        title={'Администраторы'}
        sx={{mt: 2}}
      />
    </Box>
  );
};
