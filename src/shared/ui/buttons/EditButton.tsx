import {styled} from '@mui/system';
import {IconButton, Tooltip} from '@mui/material';
import React from 'react';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

type Props = {
  onClick: () => void;
  size?: 'small' | 'inherit' | 'large' | 'medium';
  loading?: boolean;
};

const IconButtonContainer = styled(IconButton)(({theme}) => ({}));

export const EditButton: React.FC<Props> = ({onClick, size, loading}) => {
  return (
    <Tooltip title={'Редактировать'}>
      <IconButtonContainer
        aria-label="trash"
        color="primary"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick();
        }}
      >
        <EditRoundedIcon fontSize={size} />
      </IconButtonContainer>
    </Tooltip>
  );
};
