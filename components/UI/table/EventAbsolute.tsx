import {styled} from '@mui/system';
import {CELL_HEIGHT} from '../../../constants/tableSize';

export const EventAbsolute = styled('div')(({theme}) => ({
  position: 'absolute',
  top: '2px',
  width: '90%',
  height: `${CELL_HEIGHT}px`,
  border: '2px solid',
  borderColor: theme.palette.secondary.dark,
  backgroundColor: theme.palette.secondary.main,
  borderRadius: theme.shape.borderRadius,
  // @ts-ignore
  zIndex: theme.zIndex.appBar,
}));
