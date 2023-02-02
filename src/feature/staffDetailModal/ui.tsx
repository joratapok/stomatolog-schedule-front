import React from 'react';
import {Box, Typography} from '@mui/material';
import {ModalBase} from '@box/shared/ui';
import {useAppSelector} from '@box/shared/store/hooks';

type Props = {
  isVisible: boolean;
  onCloseRequest: () => void;
};

export const StaffDetailModal: React.FC<Props> = React.memo(
  ({isVisible, onCloseRequest}) => {
    const {currentStaff} = useAppSelector((state) => state.settingSlice);
    const closeModal = () => {
      onCloseRequest();
    };
    return (
      <ModalBase isVisible={isVisible} closeModal={closeModal}>
        <Typography sx={{mb: 4, mt: 4}} textAlign={'center'}>
          Детальная информация
        </Typography>
        <Box sx={{mt: 2}}>
          <Typography>Телефон: {currentStaff.username}</Typography>
          <Typography>{`${currentStaff.lastName} ${currentStaff.firstName} ${currentStaff.middleName}`}</Typography>
          <Typography>Специальность: {currentStaff.speciality}</Typography>
          <Typography>Дата рождения: {currentStaff.dateOfBirth}</Typography>
          <Typography>Телефон: {currentStaff.phone}</Typography>
        </Box>
      </ModalBase>
    );
  }
);
