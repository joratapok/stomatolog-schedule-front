import {styled} from '@mui/system';
import {Paper} from '@mui/material';

export const FormContainer = styled(Paper)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
}));
