import React from 'react';
import {alpha, styled} from '@mui/system';
import {TableCell} from '@mui/material';

type Props = {
  isonduty: string | undefined;
};

export const EventCell = styled(TableCell)<Props>(({theme, isonduty}) => ({
  minWidth: '140px',
  position: 'relative',
  borderSizing: 'border-box',
  borderBottom: '1px solid',
  borderLeft: '1px solid',
  borderTop: '1px solid',
  borderColor: theme.palette.borders.main,
  backgroundColor:
    isonduty === 'true'
      ? theme.palette.suggestions.main
      : alpha(theme.palette.background.paper, 0.5),
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: alpha(theme.palette.primary.light, 0.1),
  },
}));
