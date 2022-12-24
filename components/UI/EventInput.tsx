import {OutlinedInput, TextField} from '@mui/material';
import {styled} from '@mui/system';

export const EventInput = styled(TextField)(() => ({
  minWidth: '300px',
  marginBottom: '12px',
}));

export const MuiInput = styled(OutlinedInput)(() => ({
  minWidth: '300px',
  marginBottom: '12px',
}));
