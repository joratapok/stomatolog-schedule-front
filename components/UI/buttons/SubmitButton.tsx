import {styled} from '@mui/system';
import {LoadingButton} from '@mui/lab';

export const SubmitButton = styled(LoadingButton)(({theme}) => ({
  minWidth: '300px',
  marginBottom: theme.spacing(1),
}));
