import React, {FC, useEffect} from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {useDeleteCabinetMutation} from '@box/shared/store/services';
import {useAppSelector} from '@box/shared/store/hooks';

type Props = {
  isVisible: boolean;
  onCloseRequest: () => void;
};

export const AlertDialog: FC<Props> = ({isVisible, onCloseRequest}) => {
  const [deleteCabinet, {isLoading, isSuccess, reset}] =
    useDeleteCabinetMutation();
  const {currentCabinet} = useAppSelector((state) => state.settingSlice);

  const closeModal = () => {
    onCloseRequest();
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      closeModal();
    }
  }, [isSuccess]);

  return (
    <Dialog
      open={isVisible}
      onClose={closeModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{elevation: 0}}
    >
      <DialogTitle
        sx={{bgcolor: 'background.paper', boxShadow: 0}}
        id="alert-dialog-title"
      >
        {'Вы уверены что хотите удалить кабинет?'}
      </DialogTitle>
      <DialogContent sx={{bgcolor: 'background.paper', boxShadow: 0}}>
        <DialogContentText id="alert-dialog-description">
          Вместе с кабинетом будут безвозвратно удалены все записи относящиеся к
          этому кабинету
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{bgcolor: 'background.paper', boxShadow: 0}}>
        <Button onClick={closeModal} autoFocus>
          отмена
        </Button>
        <LoadingButton
          loading={isLoading}
          onClick={() => deleteCabinet(currentCabinet)}
          color={'error'}
        >
          удалить
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
