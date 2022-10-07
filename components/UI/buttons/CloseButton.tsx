import React from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {styled} from '@mui/system';
import {IconButton} from '@mui/material';

type Props = {
  onCloseRequest: () => void;
};

const IconButtonContainer = styled(IconButton)(({theme}) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

export const CloseButton: React.FC<Props> = ({onCloseRequest}) => {
  return (
    <IconButtonContainer
      aria-label="close"
      color="primary"
      onClick={onCloseRequest}
    >
      <CloseRoundedIcon />
    </IconButtonContainer>
  );
};
