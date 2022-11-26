import React from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {styled, useTheme} from '@mui/system';
import {IconButton, Tooltip} from '@mui/material';

type Props = {
  themeToggleRequest: () => void;
};

const ThemeButton = styled(IconButton)(({theme}) => ({
  marginRight: theme.spacing(2),
}));

export const ThemeToggle: React.FC<Props> = ({themeToggleRequest}) => {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === 'dark';
  return (
    <Tooltip title={isDarkTheme ? 'Светлая тема' : 'Темная тема'}>
      <ThemeButton onClick={themeToggleRequest}>
        {isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
      </ThemeButton>
    </Tooltip>
  );
};
