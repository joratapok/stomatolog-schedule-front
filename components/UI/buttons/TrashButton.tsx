import React from 'react';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {styled} from '@mui/system';
import {IconButton} from '@mui/material';

type Props = {
  onClick: () => void;
};

const IconButtonContainer = styled(IconButton)(({theme}) => ({}));

export const TrashButton: React.FC<Props> = ({onClick}) => {
  return (
    <IconButtonContainer aria-label="trash" color="primary" onClick={onClick}>
      <DeleteRoundedIcon />
    </IconButtonContainer>
  );
};
