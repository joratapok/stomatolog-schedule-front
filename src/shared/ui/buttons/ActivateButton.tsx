import React from 'react';
import {styled} from '@mui/system';
import {CircularProgress, IconButton, Tooltip} from '@mui/material';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';

type Props = {
  onClick: () => void;
  size?: 'small' | 'inherit' | 'large' | 'medium';
  loading?: boolean;
};

const IconButtonContainer = styled(IconButton)(({theme}) => ({}));

export const ActivateButton: React.FC<Props> = ({onClick, size, loading}) => {
  return (
    <Tooltip title={'Актвировать'}>
      <IconButtonContainer
        aria-label="deactivate"
        color="primary"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick();
        }}
      >
        {loading && <CircularProgress size={18} />}
        {!loading && <KeyRoundedIcon fontSize={size} />}
      </IconButtonContainer>
    </Tooltip>
  );
};
