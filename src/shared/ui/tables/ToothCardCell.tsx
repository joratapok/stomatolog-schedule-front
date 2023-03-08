import {styled} from '@mui/system';
import {TableCell} from '@mui/material';

export const ToothCardCell = styled(TableCell)(({theme}) => ({
  border: '1px solid',
  borderColor: theme.palette.borders.main,
  padding: '4px 12px',
}));
