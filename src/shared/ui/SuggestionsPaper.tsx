import {styled} from '@mui/system';

export const SuggestionItemContainer = styled('div')(({theme}) => ({
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'space-between',
  margin: '4px 8px',
  cursor: 'pointer',
}));
