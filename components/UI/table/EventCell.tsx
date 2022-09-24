import React from 'react';
import {alpha, styled} from '@mui/system';
import TableCell from '@mui/material/TableCell';

export const EventCell = styled(TableCell)(({theme}) => ({
  position: 'relative',
  borderSizing: 'border-box',
  borderBottom: '1px solid',
  borderLeft: '1px solid',
  borderTop: '1px solid',
  borderColor: theme.palette.borders.main,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.light, 0.1),
  },
}));
