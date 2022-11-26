import React, {useState} from 'react';
import {
  Avatar,
  IconButton,
  Menu,
  ListItemIcon,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {Settings, Logout} from '@mui/icons-material';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {postLogout} from '../store/reducers/actionCreators';

export const MenuProfile = () => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpenMenu = Boolean(anchorEl);
  const {firstName} = useAppSelector((state) => state.userSlice);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openSettings = () => {
    console.log('open settings');
  };
  const logout = () => {
    dispatch(postLogout());
  };

  return (
    <>
      <Tooltip sx={{mr: 2}} title="Профиль">
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
          <ListItemIcon onClick={openSettings}>
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
