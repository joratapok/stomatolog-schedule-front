import {styled} from '@mui/system';

export const SuggestionsPaper = styled('div')(({theme}) => ({
  position: 'absolute',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.suggestions.main,
  zIndex: 9999,
}));

export const SuggestionItemContainer = styled('div')(({theme}) => ({
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'space-between',
  margin: '4px 8px',
  cursor: 'pointer',
}));
