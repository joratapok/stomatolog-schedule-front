import {styled} from '@mui/system';

export const ContentContainer = styled('div')(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
  padding: theme.spacing(1),
}));
