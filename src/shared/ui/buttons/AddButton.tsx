import React from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {styled} from '@mui/system';
import {IconButton} from '@mui/material';

type Props = {
  onClick: () => void;
  size?: 'small' | 'inherit' | 'large' | 'medium';
  loading?: boolean;
};

const IconButtonContainer = styled(IconButton)(({theme}) => ({}));

export const AddButton: React.FC<Props> = ({onClick, size, loading}) => {
  return (
    <IconButtonContainer aria-label="trash" color="primary" onClick={onClick}>
      <AddRoundedIcon fontSize={size} />
    </IconButtonContainer>
  );
};
