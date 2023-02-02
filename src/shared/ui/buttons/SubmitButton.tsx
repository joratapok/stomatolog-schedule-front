import {styled} from '@mui/system';
import {LoadingButton} from '@mui/lab';

export const SubmitButton = styled(LoadingButton)(({theme}) => ({
  minWidth: '200px',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));
