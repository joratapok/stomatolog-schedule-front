import {styled} from '@mui/system';
import {IconButton} from '@mui/material';
import React from 'react';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

type Props = {
  onClick: () => void;
  size?: 'small' | 'inherit' | 'large' | 'medium';
  loading?: boolean;
};

const IconButtonContainer = styled(IconButton)(({theme}) => ({}));

export const DecreaseButton: React.FC<Props> = ({onClick, size, loading}) => {
  return (
    <IconButtonContainer aria-label="trash" color="primary" onClick={onClick}>
      <RemoveRoundedIcon fontSize={size} />
    </IconButtonContainer>
  );
};
