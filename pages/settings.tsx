import React, {useState} from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {ListItemText, MenuItem, MenuList, Paper} from '@mui/material';
import {SettingsModals} from '@box/widgets/settingsModals/SettingsModals';
import {ClinicInfo} from '@box/feature/clinicInfo';
import {CabinetsInfo} from '@box/feature/cabinetInfo';
import {DoctorsInfo} from '@box/feature/doctorsInfo';
import {ClientInfo} from '@box/feature/clientInfo';

enum MenuItems {
  CLINIC,
  CABINETS,
  STUFF,
  CLIENTS,
}

const Settings = () => {
  const [activeItem, setActiveItem] = useState(MenuItems.CLINIC);
  const menuHandler = (item: MenuItems) => {
    if (item === activeItem) {
      return;
    }
    setActiveItem(item);
  };
  return (
    <Grid container xs={12} spacing={{sm: 1, md: 2}}>
      <Grid
        xs={12}
        sm={2}
        sx={{minWidth: {lg: '250px', sm: '200px'}, maxWidth: '600px', mb: 2}}
      >
        <Paper>
          <MenuList>
            <MenuItem onClick={() => menuHandler(MenuItems.CLINIC)}>
              <ListItemText>Клиника</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => menuHandler(MenuItems.CABINETS)}>
              <ListItemText>Кабинеты</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => menuHandler(MenuItems.STUFF)}>
              <ListItemText>Персонал</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => menuHandler(MenuItems.CLIENTS)}>
              <ListItemText>Клиенты</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Grid>
      <Grid xs={12} sm={true} sx={{minWidth: '300px'}}>
        <Paper>
          {activeItem === MenuItems.CLINIC && <ClinicInfo />}
          {activeItem === MenuItems.CABINETS && <CabinetsInfo />}
          {activeItem === MenuItems.STUFF && <DoctorsInfo />}
          {activeItem === MenuItems.CLIENTS && <ClientInfo />}
        </Paper>
      </Grid>
      <SettingsModals />
    </Grid>
  );
};

export default Settings;
