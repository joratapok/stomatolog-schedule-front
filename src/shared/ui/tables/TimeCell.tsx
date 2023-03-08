import {styled} from '@mui/system';
import {TableCell} from '@mui/material';

export const TimeCell = styled(TableCell)(({theme}) => ({
  position: 'sticky',
  left: 0,
  minWidth: '65px',
  borderSizing: 'border-box',
  borderBottom: '1px solid',
  borderColor: theme.palette.borders.main,
  backgroundColor: theme.palette.background.paper,
  // @ts-ignore
  zIndex: theme.zIndex.appBar + 1,
}));
