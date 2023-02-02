import {styled} from '@mui/system';
import {Table} from '@mui/material';

export const TableService = styled(Table)(({theme}) => ({
  border: '1px solid',
  borderColor: theme.palette.borders.main,
}));
