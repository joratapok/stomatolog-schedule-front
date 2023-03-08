import React from 'react';
import {styled} from '@mui/system';
import {CircularProgress, IconButton, Tooltip} from '@mui/material';
import KeyOffRoundedIcon from '@mui/icons-material/KeyOffRounded';

type Props = {
  onClick: () => void;
  size?: 'small' | 'inherit' | 'large' | 'medium';
  loading?: boolean;
};

const IconButtonContainer = styled(IconButton)(({theme}) => ({}));

export const DeactivateButton: React.FC<Props> = ({onClick, size, loading}) => {
  return (
    <Tooltip title={'Деактивировать'}>
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
        {!loading && <KeyOffRoundedIcon fontSize={size} />}
      </IconButtonContainer>
    </Tooltip>
  );
};
