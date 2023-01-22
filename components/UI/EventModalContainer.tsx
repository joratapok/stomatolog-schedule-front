import {styled} from '@mui/system';

export const EventModalContainer = styled('div')(({theme}) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('xs')]: {
    width: '420px',
  },
  [theme.breakpoints.up('sm')]: {
    width: '600px',
  },
  [theme.breakpoints.up('md')]: {
    width: '900px',
  },
}));
