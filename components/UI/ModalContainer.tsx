import {styled} from '@mui/system';
import {DialogContent} from '@mui/material';

export const SDialogContent = styled(DialogContent)(({theme}) => ({
  [theme.breakpoints.up('md')]: {
    minWidth: theme.breakpoints.values.md - 40,
  },
  [theme.breakpoints.down('md')]: {
    minWidth: '300px',
  },
}));
