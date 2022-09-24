import React from 'react';
import {styled} from '@mui/system';
import TableCell from '@mui/material/TableCell';

export const TimeCell = styled(TableCell)(({theme}) => ({
  width: '65px',
  borderSizing: 'border-box',
  borderBottom: '1px solid',
  borderColor: theme.palette.borders.main,
}));
