import React from 'react';
import {styled} from '@mui/system';
import TableRow from '@mui/material/TableRow';
import {CELL_HEIGHT} from '../../../constants/tableSize';

export const EventRow = styled(TableRow)(({theme}) => ({
  'th,td': {
    // padding: theme.spacing(1),
    padding: 0,
    height: `${CELL_HEIGHT}px`,
  },
  '&:hover': {
    '& th': {
      color: theme.palette.primary.main,
      fontWeight: '500',
    },
  },
  '&:first-of-type th,td': {
    borderTop: '1px solid',
    borderColor: theme.palette.borders.main,
  },
  '&:last-of-type th,td': {
    borderBottom: '0px solid',
  },
}));
