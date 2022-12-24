import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {addMinutes, format, parse} from 'date-fns';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Modal,
  Box,
  FormHelperText,
} from '@mui/material';
import ru from 'date-fns/locale/ru';
import {EventInput, MuiInput} from '../UI/EventInput';
import {SubmitButton} from '../UI/buttons/SubmitButton';
import {CloseButton} from '../UI/buttons/CloseButton';
import {useAppSelector} from '../../hooks/redux';
import {SelectContainer} from '../UI/SelectContainer';
import {useEventsData} from '../../hooks/useEventsData';
import {useCreateEventMutation} from '../../services/events.api';
import {ICreateEvent, EventStatus} from '../../models/events/ICreateEvent';
import {IClient} from '../../models/IClient';
import {DATE_FORMAT} from '../../constants/dateFormat';
import {DateMaskInput, PhoneMaskInput} from '../MaskInput';
import {InputWithSuggestions} from '../InputWithSuggestions';
import {dateParser} from '../../helpers/dateParser';
import {statusSwitch} from '../../helpers/statusSwitch';

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

type Props = {
  isVisible: boolean;
  onCloseRequest: () => void;
};

type FormState = IClient & {
  dateFinish: string;
  service: string;
  status: EventStatus;
  doctor: number;
  //client
};

export const EventCreator: React.FC<Props> = React.memo(
  ({isVisible, onCloseRequest}) => {
    const [clientId, setClientId] = useState(0);
    const {
      newEvent: {dateStart, cabinet, doctor},
    } = useAppSelector((state) => state.eventSlice);
    const {doctors} = useEventsData();
    const [createEvent, {isLoading, isError, error, isSuccess, reset}] =
      useCreateEventMutation();
    const {
      setValue,
      control,
      handleSubmit,
      reset: resetForm,
      formState: {errors},
    } = useForm<FormState>();

    const {date, time, dateText} = useMemo(() => {
      const date = dateStart ? dateParser(dateStart) : new Date();
      const time = format(date, 'HH:mm');
      const dateText = format(date, 'do MMMM', {locale: ru});
      return {date, time, dateText};
    }, [dateStart]);

    const closeModal = () => {
      resetForm();
      onCloseRequest();
    };

    const nullifyClient = useCallback(() => {
      setClientId(0);
      setValue('firstName', '');
      setValue('middleName', '');
      setValue('dateOfBirth', '');
      setValue('phone', '');
    }, []);

    const setClient = useCallback((client: IClient) => {
      setClientId(client.id ?? 0);
      setValue('lastName', client.lastName);
      setValue('firstName', client.firstName);
      setValue('middleName', client.middleName);
      setValue('gender', client.gender);
      setValue('dateOfBirth', client.dateOfBirth);
      setValue('phone', client.phone);
    }, []);
    const onSubmit: SubmitHandler<FormState> = useCallback(
      (data) => {
        const dateFinish = format(
          addMinutes(date, parseInt(data.dateFinish, 10)),
          DATE_FORMAT
        );
        const clientInfo = {
          firstName: data.firstName,
          lastName: data.lastName,
          middleName: data.middleName,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth,
          phone: data.phone,
        };
        const client: IClient | number = clientId ? clientId : clientInfo;
        const eventData: ICreateEvent = {
          dateStart,
          dateFinish,
          service: data.service,
          status: data.status,
          cabinet: cabinet.id,
          doctor: data.doctor,
          client,
        };
        // console.log('eventData ', eventData);
        createEvent(eventData);
      },
      [date, dateStart, cabinet, clientId]
    );

    useEffect(() => {
      if (isSuccess) {
        reset();
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
          <Typography>Дата: {dateText}</Typography>
          <Typography>Кабинет: {cabinet.name}</Typography>
          <Typography>Время: {time}</Typography>

          <Controller
            rules={{required: true}}
            name={'doctor'}
            control={control}
            defaultValue={doctor}
            render={({field: {onChange, onBlur, value}}) => (
              <SelectContainer>
                <FormControl fullWidth>
                  <InputLabel id="doctor-label">Врач</InputLabel>
                  <Select
                    labelId="doctor-label"
                    id="doctor-select"
                    onBlur={onBlur}
                    value={value}
                    label="Врач"
                    onChange={(event) => {
                      console.log('onChange doctor id ', event.target.value);
                      onChange(event.target.value);
                    }}
                  >
                    {doctors?.map((doctor) => (
                      <MenuItem key={doctor.id} value={doctor.id}>
                        {doctor.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </SelectContainer>
            )}
          />

          <Controller
            rules={{
              required: true,
              maxLength: 3,
              validate: (val) => parseInt(val) < 600 && parseInt(val) > 0,
            }}
            name={'dateFinish'}
            control={control}
            defaultValue={''}
            render={({field: {onChange, onBlur, value}}) => (
              <EventInput
                required
                fullWidth
                type={'number'}
                label={'длительность мин.'}
                onChange={(duration) => {
                  onChange(duration.target.value);
                }}
                value={value}
                error={!!errors.dateFinish}
                onBlur={onBlur}
                autoCapitalize={'none'}
              />
            )}
          />

          <Controller
            rules={{required: true, maxLength: 100}}
            name={'service'}
            control={control}
            defaultValue={''}
            render={({field: {onChange, onBlur, value}}) => (
              <EventInput
                required
                fullWidth
                label={'Услуга'}
                onChange={onChange}
                value={value}
                error={!!errors.service}
                onBlur={onBlur}
                autoCapitalize={'none'}
              />
            )}
          />

          <Controller
            rules={{required: true}}
            name={'status'}
            control={control}
            defaultValue={EventStatus.NOT_CONFIRMED}
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
                      console.log('onChange status ', event.target.value);
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

          <Controller
            rules={{required: true, maxLength: 100}}
            name={'lastName'}
            control={control}
            defaultValue={''}
            render={({field: {onChange, onBlur, value}}) => (
              <InputWithSuggestions
                onChange={(e) => {
                  if (clientId) {
                    nullifyClient();
                  }
                  onChange(e);
                }}
                onBlur={onBlur}
                value={value}
                errors={!!errors.service}
                setClient={setClient}
              />
            )}
          />

          <Controller
            rules={{required: true, maxLength: 100}}
            name={'firstName'}
            control={control}
            defaultValue={''}
            render={({field: {onChange, onBlur, value}}) => (
              <EventInput
                required
                fullWidth
                autoComplete={'off'}
                disabled={!!clientId}
                label={'Имя'}
                onChange={onChange}
                value={value}
                error={!!errors.service}
                onBlur={onBlur}
                autoCapitalize={'none'}
              />
            )}
          />

          <Controller
            rules={{required: true, maxLength: 100}}
            name={'middleName'}
            control={control}
            defaultValue={''}
            render={({field: {onChange, onBlur, value}}) => (
              <EventInput
                required
                fullWidth
                disabled={!!clientId}
                label={'Отчество'}
                onChange={onChange}
                value={value}
                error={!!errors.service}
                onBlur={onBlur}
                autoCapitalize={'none'}
              />
            )}
          />

          <Controller
            rules={{required: true}}
            name={'dateOfBirth'}
            control={control}
            defaultValue={''}
            render={({field: {onChange, onBlur, value}}) => (
              <FormControl variant={'outlined'} fullWidth>
                <InputLabel htmlFor="date-select-label">
                  Дата рождения
                </InputLabel>
                <MuiInput
                  required
                  fullWidth
                  autoComplete={'off'}
                  disabled={!!clientId}
                  label={'Дата рождения'}
                  id="date-select-label"
                  onChange={onChange}
                  value={value}
                  error={!!errors.service}
                  onBlur={onBlur}
                  autoCapitalize={'none'}
                  inputComponent={DateMaskInput as any}
                />
              </FormControl>
            )}
          />

          <Controller
            rules={{required: true}}
            name={'gender'}
            control={control}
            defaultValue={'male'}
            render={({field: {onChange, onBlur, value}}) => (
              <SelectContainer>
                <FormControl fullWidth>
                  <InputLabel id="gender-select-label">Пол</InputLabel>
                  <Select
                    labelId="gender-select-label"
                    id="gender-select"
                    disabled={!!clientId}
                    onBlur={onBlur}
                    value={value}
                    label="Статус"
                    onChange={(event) => {
                      console.log('onChange status ', event.target.value);
                      onChange(event.target.value);
                    }}
                  >
                    <MenuItem value="male">Мужской</MenuItem>
                    <MenuItem value="female">Женский</MenuItem>
                  </Select>
                </FormControl>
              </SelectContainer>
            )}
          />

          <Controller
            rules={{required: true}}
            name={'phone'}
            control={control}
            defaultValue={''}
            render={({field: {onChange, onBlur, value}}) => (
              <FormControl variant={'outlined'} fullWidth>
                <InputLabel htmlFor="phone-select-label">Телефон</InputLabel>
                <MuiInput
                  required
                  fullWidth
                  disabled={!!clientId}
                  autoComplete={'off'}
                  label={'Телефон'}
                  id="phone-select-label"
                  onChange={onChange}
                  value={value}
                  error={!!errors.service}
                  onBlur={onBlur}
                  autoCapitalize={'none'}
                  inputComponent={PhoneMaskInput as any}
                />
              </FormControl>
            )}
          />

          <SubmitButton
            fullWidth
            onClick={handleSubmit(onSubmit)}
            loading={isLoading}
            variant={'text'}
          >
            Создать запись
          </SubmitButton>
          <FormHelperText hidden={!isError} error={true}>
            {'Ошибка'}
          </FormHelperText>
          <CloseButton onCloseRequest={closeModal} />
        </Box>
      </Modal>
    );
  }
);
