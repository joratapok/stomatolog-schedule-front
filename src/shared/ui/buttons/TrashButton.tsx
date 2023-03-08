import React from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {styled} from '@mui/system';
import {CircularProgress, IconButton} from '@mui/material';

type Props = {
  onClick: () => void;
  size?: 'small' | 'inherit' | 'large' | 'medium';
  loading?: boolean;
  isRed?: boolean;
};

const IconButtonContainer = styled(IconButton)(({theme}) => ({}));

export const TrashButton: React.FC<Props> = ({
  onClick,
  size,
  loading,
  isRed = false,
}) => {
  return (
    <IconButtonContainer
      aria-label="trash"
      color={isRed ? 'error' : 'primary'}
      onClick={onClick}
    >
      {loading && <CircularProgress size={18} />}
      {!loading && <DeleteRoundedIcon fontSize={size} />}
    </IconButtonContainer>
  );
};
