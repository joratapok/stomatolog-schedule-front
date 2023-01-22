import React from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {styled} from '@mui/system';
import {IconButton} from '@mui/material';

type Props = {
  onClick: () => void;
  size?: 'small' | 'inherit' | 'large' | 'medium';
  loading?: boolean;
};

const IconButtonContainer = styled(IconButton)(({theme}) => ({}));

export const TrashButton: React.FC<Props> = ({onClick, size, loading}) => {
  return (
    <IconButtonContainer aria-label="trash" color="primary" onClick={onClick}>
      <DeleteRoundedIcon fontSize={size} />
    </IconButtonContainer>
  );
};
