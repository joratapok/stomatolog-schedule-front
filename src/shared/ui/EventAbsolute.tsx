import {styled} from '@mui/system';
import {CELL_HEIGHT} from '@box/shared/constants';

export const EventAbsolute = styled('div')(({theme}) => ({
  position: 'absolute',
  top: '2px',
  width: '95%',
  minHeight: `${CELL_HEIGHT}px`,
  border: '2px solid',
  borderColor: theme.palette.secondary.dark,
  backgroundColor: theme.palette.secondary.main,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  // @ts-ignore
  zIndex: theme.zIndex.appBar,
  '&:hover': {
    left: '4px',
  },
}));
