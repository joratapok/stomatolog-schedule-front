import React, {useEffect} from 'react';
import {Box, Button, Modal, Typography} from '@mui/material';
import {CloseButton} from '../UI/buttons/CloseButton';
import {useAppSelector} from '../../hooks/redux';
import {fullNameCreator} from '../../helpers/fullNameCreator';
import {useDeleteEventMutation} from '../../services/events.api';
import {useEventsData} from '../../hooks/useEventsData';
import {statusSwitch} from '../../helpers/statusSwitch';
import {TrashButton} from '../UI/buttons/TrashButton';

type Props = {
  isVisible: boolean;
  onCloseRequest: () => void;
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 800,
  minWidth: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const EventDetails: React.FC<Props> = React.memo(
  ({isVisible, onCloseRequest}) => {
    const {
      eventDetails: {
        id,
        dateStart,
        dateFinish,
        doctor,
        client,
        status,
        service,
      },
      cabinetDetails,
    } = useAppSelector((state) => state.eventSlice);
    const {doctors} = useEventsData();
    const actualDoctor = doctors.find((doc) => doc.id === doctor);
    const [deleteEvent, {isSuccess, isLoading, isError}] =
      useDeleteEventMutation();
    const closeModal = () => {
      onCloseRequest();
    };

    useEffect(() => {
      if (isSuccess) {
        closeModal();
      }
    }, [isSuccess]);
    return (
      <Modal
        open={isVisible}
        onClose={(e, reason) => {
          if (reason === 'backdropClick') {
            return;
          }
          closeModal();
        }}
      >
        <Box sx={style}>
          <Typography>Кабинет: {cabinetDetails}</Typography>
          <Typography>
            Доктор:{' '}
            {fullNameCreator(
              actualDoctor?.lastName ?? '',
              actualDoctor?.firstName ?? '',
              actualDoctor?.middleName ?? ''
            )}
          </Typography>
          <Typography>Начало: {dateStart}</Typography>
          <Typography>Конец: {dateFinish}</Typography>
          <Typography>
            Клиент:{' '}
            {fullNameCreator(
              client.lastName,
              client.firstName,
              client.middleName
            )}
          </Typography>
          <Typography>Статус: {statusSwitch(status)}</Typography>
          <Typography>Услуга: {service}</Typography>

          <TrashButton onClick={() => deleteEvent(id)} />

          <CloseButton onCloseRequest={closeModal} />
        </Box>
      </Modal>
    );
  }
);
