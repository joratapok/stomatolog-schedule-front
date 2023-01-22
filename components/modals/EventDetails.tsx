import React, {useCallback, useEffect} from 'react';
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
} from '@mui/material';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useAppSelector} from '../../hooks/redux';
import {fullNameCreator} from '../../helpers/fullNameCreator';
import {
  useDeleteEventMutation,
  usePatchEventMutation,
} from '../../services/events.api';
import {useEventsData} from '../../hooks/useEventsData';
import {statusSwitch} from '../../helpers/statusSwitch';
import {ServiceSuggestions} from '../UI/ServiceSuggestions';
import {ServicesTable} from '../ServicesTable';
import {SubmitButton} from '../UI/buttons/SubmitButton';
import {EventStatus, ToothCard} from '../../models/events/ICreateEvent';
import {SelectContainer} from '../UI/SelectContainer';
import {SelectChangeEvent} from '@mui/material/Select';
import {useServiceHandler} from '../../hooks/useServiceHandler';
import {ModalBase} from './ModalBase';
import {Box} from '@mui/system';
import {TypoContent} from '../UI/typography/TypoContent';

type Props = {
  isVisible: boolean;
  onCloseRequest: () => void;
};

type FormState = {
  service: string;
  status: EventStatus;
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
        comment,
        services,
      },
      cabinetDetails,
    } = useAppSelector((state) => state.eventSlice);
    const {doctors} = useEventsData();
    const actualDoctor = doctors.find((doc) => doc.id === doctor);
    const [deleteEvent, {isLoading: isDeleteLoading}] =
      useDeleteEventMutation();
    const [patchEvent, {isSuccess, isLoading, isError}] =
      usePatchEventMutation();
    const {
      control,
      handleSubmit,
      reset: resetForm,
      formState: {errors},
    } = useForm<FormState>();
    const {
      toothNumber,
      localServices,
      setToothNumber,
      setServices,
      addService,
      deleteService,
    } = useServiceHandler();
    const closeModal = () => {
      onCloseRequest();
      resetForm();
    };
    const onSubmit: SubmitHandler<FormState> = useCallback(
      (data) => {
        const services = localServices.map((el) => ({
          toothNumber: el.toothNumber,
          dentalServices: el.dentalServices.map((el) => el.id),
        }));
        patchEvent({
          id,
          services,
          status: data.status,
        });
      },
      [localServices]
    );
    const onDeleteEvent = (id: number) => {
      deleteEvent(id);
      closeModal();
    };

    useEffect(() => {
      if (services) {
        setServices(services);
      }
    }, [services]);

    useEffect(() => {
      if (isSuccess) {
        setServices([]);
        closeModal();
      }
    }, [isSuccess]);
    return (
      <ModalBase isVisible={isVisible} closeModal={closeModal}>
        <TypoContent sx={{mt: 4}}>Кабинет: {cabinetDetails}</TypoContent>
        <TypoContent>
          Доктор:{' '}
          {fullNameCreator(
            actualDoctor?.lastName ?? '',
            actualDoctor?.firstName ?? '',
            actualDoctor?.middleName ?? ''
          )}
        </TypoContent>
        <TypoContent>Начало: {dateStart}</TypoContent>
        <TypoContent>Конец: {dateFinish}</TypoContent>
        <TypoContent>Комментарий: {comment}</TypoContent>
        <TypoContent sx={{mb: 2}}>
          Клиент:
          {`  ${client.lastName} ${client.firstName} ${client.middleName}`}
        </TypoContent>

        <Controller
          rules={{required: true}}
          name={'status'}
          control={control}
          defaultValue={status as EventStatus}
          render={({field: {onChange, onBlur, value}}) => (
            <SelectContainer>
              <FormControl fullWidth>
                <InputLabel id="status-select-label">статус</InputLabel>
                <Select
                  labelId="status-select-label"
                  id="status-select"
                  onBlur={onBlur}
                  value={value}
                  label="Статус"
                  onChange={(event) => {
                    onChange(event.target.value);
                  }}
                >
                  {Object.values(EventStatus).map((s) => (
                    <MenuItem key={s} value={s}>
                      {statusSwitch(s)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </SelectContainer>
          )}
        />

        <SelectContainer>
          <FormControl fullWidth>
            <InputLabel id="status-select-label">Выбор Зуба</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={toothNumber}
              label="Выбор Зуба"
              onChange={(event: SelectChangeEvent<number>) => {
                setToothNumber(Number(event?.target?.value));
              }}
            >
              {ToothCard.map((name, index) => (
                <MenuItem key={index} value={index}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </SelectContainer>

        <ServiceSuggestions setService={addService} toothNumber={toothNumber} />

        <ServicesTable services={localServices} deleteService={deleteService} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: {xs: 'column', md: 'row'},
            mt: 2,
          }}
        >
          <SubmitButton
            onClick={handleSubmit(onSubmit)}
            loading={isLoading}
            variant={'text'}
          >
            Сохранить
          </SubmitButton>
          <SubmitButton onClick={closeModal} variant={'text'}>
            Отмена
          </SubmitButton>
          <SubmitButton
            color={'error'}
            onClick={() => onDeleteEvent(id)}
            loading={isDeleteLoading}
            variant={'text'}
          >
            Удалить
          </SubmitButton>
        </Box>
      </ModalBase>
    );
  }
);
