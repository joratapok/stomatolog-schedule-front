import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {addMinutes, format} from 'date-fns';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  FormHelperText,
} from '@mui/material';
import ru from 'date-fns/locale/ru';
import {EventInput, MuiInput} from '../UI/EventInput';
import {SubmitButton} from '../UI/buttons/SubmitButton';
import {useAppSelector} from '../../hooks/redux';
import {SelectContainer} from '../UI/SelectContainer';
import {useEventsData} from '../../hooks/useEventsData';
import {useCreateEventMutation} from '../../services/events.api';
import {ICreateEvent, EventStatus} from '../../models/events/ICreateEvent';
import {IClient} from '../../models/IClient';
import {DATE_FORMAT} from '../../constants/dateFormat';
import {DateMaskInput, PhoneMaskInput} from '../MaskInput';
import {dateParser} from '../../helpers/dateParser';
import {statusSwitch} from '../../helpers/statusSwitch';
import {ClientsSuggestions} from '../UI/ClientsSuggestions';
import {ModalBase} from './ModalBase';
import {TypoContent} from '../UI/typography/TypoContent';

type Props = {
  isVisible: boolean;
  onCloseRequest: () => void;
};

type FormState = IClient & {
  dateFinish: string;
  comment: string;
  status: EventStatus;
  doctor: number;
};

export const EventCreator: React.FC<Props> = React.memo(
  ({isVisible, onCloseRequest}) => {
    const [clientId, setClientId] = useState(0);
    const {
      newEvent: {dateStart, cabinet, doctor},
    } = useAppSelector((state) => state.eventSlice);
    const {doctors} = useEventsData();
    const [createEvent, {isLoading, isError, error, isSuccess}] =
      useCreateEventMutation();
    const {
      setValue,
      control,
      handleSubmit,
      reset: resetForm,
      formState: {errors},
    } = useForm<FormState>({
      defaultValues: {lastName: '', comment: '', dateFinish: ''},
    });

    const {date, time, dateText} = useMemo(() => {
      const date = dateStart ? dateParser(dateStart) : new Date();
      const time = format(date, 'HH:mm');
      const dateText = format(date, 'do MMMM', {locale: ru});
      return {date, time, dateText};
    }, [dateStart]);

    const nullifyClient = useCallback(() => {
      setClientId(0);
      setValue('firstName', '');
      setValue('lastName', '');
      setValue('middleName', '');
      setValue('dateOfBirth', '');
      setValue('phone', '');
    }, []);

    const closeModal = useCallback(() => {
      resetForm();
      onCloseRequest();
    }, [onCloseRequest, resetForm]);

    const setClient = useCallback((client: IClient) => {
      if (!client) {
        nullifyClient();
        return;
      }
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
          services: [],
          comment: data.comment,
          status: data.status,
          cabinet: cabinet.id,
          doctor: data.doctor,
          client,
        };
        createEvent(eventData);
      },
      [date, dateStart, cabinet, clientId]
    );

    useEffect(() => {
      if (isSuccess) {
        closeModal();
      }
    }, [isSuccess]);
    return (
      <ModalBase isVisible={isVisible} closeModal={closeModal}>
        <TypoContent>Дата: {dateText}</TypoContent>
        <TypoContent>Кабинет: {cabinet.name}</TypoContent>
        <TypoContent sx={{mb: 2}}>Время: {time}</TypoContent>

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
              inputProps={{type: 'numeric'}}
            />
          )}
        />

        <Controller
          rules={{maxLength: 150}}
          name={'comment'}
          control={control}
          // defaultValue={''}
          render={({field: {onChange, onBlur, value}}) => (
            <EventInput
              fullWidth
              autoComplete={'off'}
              label={'Комментарий'}
              onChange={onChange}
              value={value}
              error={!!errors.comment}
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
          render={({field: {onChange, value}}) => (
            <ClientsSuggestions
              onChange={(e) => {
                if (clientId) {
                  nullifyClient();
                }
                onChange(e);
              }}
              value={value}
              errors={!!errors.lastName}
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
              error={!!errors.firstName}
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
              error={!!errors.middleName}
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
              <InputLabel htmlFor="date-select-label">Дата рождения</InputLabel>
              <MuiInput
                required
                fullWidth
                autoComplete={'off'}
                disabled={!!clientId}
                label={'Дата рождения'}
                id="date-select-label"
                onChange={onChange}
                value={value}
                error={!!errors.dateOfBirth}
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
                error={!!errors.phone}
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
      </ModalBase>
    );
  }
);
