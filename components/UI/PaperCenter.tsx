import {styled} from '@mui/system';
import {Paper} from '@mui/material';

export const PaperCenter = styled(Paper)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 16,
  marginBottom: 12,
  padding: 8,
}));
