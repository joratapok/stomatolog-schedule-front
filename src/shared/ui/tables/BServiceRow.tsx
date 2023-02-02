import {styled} from '@mui/system';
import {TableRow} from '@mui/material';

export const BServiceRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));
