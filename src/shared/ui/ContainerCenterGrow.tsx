import {styled} from '@mui/system';

export const ContainerCenterGrow = styled('div')(() => ({
  display: 'flex',
  minHeight: '60%',
  maxHeight: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));
