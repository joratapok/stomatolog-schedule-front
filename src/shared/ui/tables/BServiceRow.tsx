import {styled} from '@mui/system';
import {TableRow} from '@mui/material';

type Props = {
  pointer?: string;
};

export const BServiceRow = styled(TableRow)<Props>(({theme, pointer}) => ({
  cursor: pointer ? 'pointer' : 'auto',
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));
