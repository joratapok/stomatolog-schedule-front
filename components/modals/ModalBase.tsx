import React, {PropsWithChildren} from 'react';
import {CloseButton} from '../UI/buttons/CloseButton';
import {Dialog, DialogContent, useMediaQuery} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {SDialogContent} from '../UI/ModalContainer';

interface Props extends PropsWithChildren {
  isVisible: boolean;
  closeModal: () => void;
}

export const ModalBase: React.FC<Props> = ({
  isVisible,
  closeModal,
  children,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Dialog
      fullScreen={fullScreen}
      maxWidth={'md'}
      open={isVisible}
      onClose={(e, reason) => {
        if (reason === 'backdropClick') {
          return;
        }
        closeModal();
      }}
    >
      <SDialogContent
        sx={{
          position: 'relative',
          p: 2,
          bgcolor: 'background.paper',
        }}
      >
        {children}
        <CloseButton onCloseRequest={closeModal} />
      </SDialogContent>
    </Dialog>
  );
};
