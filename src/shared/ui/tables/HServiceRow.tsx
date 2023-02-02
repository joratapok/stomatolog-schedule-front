import {alpha, styled} from '@mui/system';
import {TableRow} from '@mui/material';

export const HServiceRow = styled(TableRow)(({theme}) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.6),
}));
