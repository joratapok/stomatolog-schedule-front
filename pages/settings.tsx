import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {Paper, Tab, Tabs} from '@mui/material';
import {SettingsModals} from '@box/widgets/settingsModals/SettingsModals';
import {ClinicInfo} from '@box/widgets/clinicInfo';
import {DoctorsInfo} from '@box/widgets/doctorsInfo';
import {ClientInfo} from '@box/widgets/clientInfo';
import {useAppDispatch, useAppSelector} from '@box/shared/store/hooks';
import {MenuItems, settingSlice} from '@box/shared/store/reducers';

const Settings = () => {
  const dispatch = useAppDispatch();
  const {setActiveItem} = settingSlice.actions;
  const {activeItem} = useAppSelector((state) => state.settingSlice);
  const tabHandler = (val: MenuItems) => {
    dispatch(setActiveItem(val));
  };
  return (
    <Grid container xs={12} spacing={{sm: 1, md: 2}}>
      <Grid
        xs={12}
        sm={2}
        sx={{minWidth: {lg: '250px', sm: '200px'}, maxWidth: '600px', mb: 2}}
      >
        <Paper>
          <Tabs
            orientation={'vertical'}
            value={activeItem}
            onChange={(_, val) => tabHandler(val)}
          >
            <Tab label={'Клиника'} value={MenuItems.CLINIC} />
            <Tab label={'Персонал'} value={MenuItems.STUFF} />
            <Tab label={'Клиенты'} value={MenuItems.CLIENTS} />
          </Tabs>
        </Paper>
      </Grid>
      <Grid xs={12} sm={true} sx={{minWidth: '300px'}}>
        <Paper>
          {activeItem === MenuItems.CLINIC && <ClinicInfo />}
          {activeItem === MenuItems.STUFF && <DoctorsInfo />}
          {activeItem === MenuItems.CLIENTS && <ClientInfo />}
        </Paper>
      </Grid>
      <SettingsModals />
    </Grid>
  );
};

export default Settings;
