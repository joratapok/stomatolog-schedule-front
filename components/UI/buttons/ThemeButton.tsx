import React from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {styled, useTheme} from '@mui/system';
import {IconButton} from '@mui/material';

type Props = {
  themeToggleRequest: () => void;
}

const ThemeButton = styled(IconButton)(() => ({
  position: 'absolute',
  right: '20px',
  top: '8px',
}));

export const ThemeToggle: React.FC<Props> = ({themeToggleRequest}) => {
  const theme = useTheme();
  return (
    <ThemeButton onClick={themeToggleRequest}>
      {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
    </ThemeButton>
  );
};
