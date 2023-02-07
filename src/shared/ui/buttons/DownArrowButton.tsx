import React from 'react';
import {styled} from '@mui/system';
import {IconButton, Tooltip} from '@mui/material';
import KeyOffRoundedIcon from '@mui/icons-material/KeyOffRounded';

type Props = {
  onClick: () => void;
  size?: 'small' | 'inherit' | 'large' | 'medium';
  loading?: boolean;
};

const IconButtonContainer = styled(IconButton)(({theme}) => ({}));

export const DownArrowButton: React.FC<Props> = ({onClick, size, loading}) => {
  return (
    <Tooltip title={'Деактивировать'}>
      <IconButtonContainer
        aria-label="deactivate"
        color="primary"
        onClick={(e) => {
          onClick();
        }}
      >
        <KeyOffRoundedIcon fontSize={size} />
      </IconButtonContainer>
    </Tooltip>
  );
};
