import {styled} from '@mui/system';
import {Button} from '@mui/material';

export const SubmitButton = styled(Button)(({theme}) => ({
  minWidth: '300px',
  marginBottom: theme.spacing(1),
  backgroundColor: theme.palette.button.main,
  color: theme.palette.button.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.button.dark,
  },
}));
