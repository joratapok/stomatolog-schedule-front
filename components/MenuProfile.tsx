import React, {useState} from 'react';
import {
  Avatar,
  IconButton,
  Menu,
  ListItemIcon,
  MenuItem,
  Tooltip,
  Divider,
  Typography,
} from '@mui/material';
import {useRouter} from 'next/router';
import {Settings, Logout} from '@mui/icons-material';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {postLogout} from '../store/reducers/actionCreators';
import {fullNameCreator} from '../helpers/fullNameCreator';
import {EUrls} from '../types/urls';

export const MenuProfile = () => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const isOpenMenu = Boolean(anchorEl);
  const {firstName, lastName, middleName} = useAppSelector(
    (state) => state.userSlice
  );
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openSettings = () => {
    console.log('redirect to sett');
    router
      .push(EUrls.SETTINGS)
      .catch((e) => console.log('redirect settings error', e));
  };
  const logout = () => {
    dispatch(postLogout());
  };

  return (
    <>
      <Tooltip sx={{position: 'absolute', right: 8}} title="Профиль">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={isOpenMenu ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={isOpenMenu ? 'true' : undefined}
        >
          <Avatar sx={{width: 32, height: 32}}>
            {firstName ? firstName[0] : 'P'}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={isOpenMenu}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <MenuItem>
          <Typography>
            {fullNameCreator(lastName, firstName, middleName)}
          </Typography>
        </MenuItem>
        <Divider sx={{my: 0.5}} />
        <MenuItem onClick={openSettings}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Настройки
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Выйти
        </MenuItem>
      </Menu>
    </>
  );
};
