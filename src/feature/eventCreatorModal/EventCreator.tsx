import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {addMinutes, format} from 'date-fns';
import {FormHelperText} from '@mui/material';
import ru from 'date-fns/locale/ru';

import {ClientSuggestionsInput} from '@box/entities/clientSuggestions';
import {useAppSelector} from '@box/shared/store/hooks';
import {useEventsData} from '@box/shared/hooks';
import {useCreateEventMutation} from '@box/shared/store/services';
import {DATE_FORMAT} from '@box/shared/constants';
import {dateParser} from '@box/shared/helpers';
import {
  EventStatus,
  ICreateEvent,
  IClient,
  ICreateClient,
} from '@box/shared/models';
import {SubmitButton, TypoContent, ModalBase} from '@box/shared/ui';
import {
  DateOfBirthInput,
  FirstNameInput,
  MiddleNameInput,
  PhoneInput,
  GenderInput,
  EventStatusInput,
  CommentInput,
  DateFinishInput,
  DoctorInput,
} from '@box/shared/inputs';

type Props = {
  isVisible: boolean;
  onCloseRequest: () => void;
};

type FormState = ICreateClient & {
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
      setError,
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
        const client: ICreateClient | number = clientId ? clientId : clientInfo;
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
      if (error && 'data' in error) {
        const responseErrors = Object.entries(
          error.data as Record<keyof FormState, string[]>
        );
        responseErrors.forEach(([key, val]) => {
          // @ts-ignore
          setError(key, {message: val[0]});
        });
      }
    }, [error]);

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

        <DoctorInput
          doctor={doctor || doctors[0]?.id}
          doctors={doctors}
          control={control}
          error={errors.doctor}
        />
        <DateFinishInput control={control} error={!!errors.dateFinish} />
        <CommentInput control={control} error={!!errors.comment} />
        <EventStatusInput control={control} />
        <ClientSuggestionsInput
          control={control}
          error={!!errors.lastName}
          setClient={setClient}
          clientId={clientId}
          nullifyClient={nullifyClient}
        />
        <FirstNameInput
          control={control}
          error={!!errors.firstName}
          disabled={Boolean(clientId)}
        />
        <MiddleNameInput
          control={control}
          error={!!errors.middleName}
          disabled={Boolean(clientId)}
        />
        <DateOfBirthInput
          control={control}
          error={errors.dateOfBirth}
          disabled={Boolean(clientId)}
        />
        <GenderInput control={control} disabled={Boolean(clientId)} />
        <PhoneInput
          control={control}
          error={errors.phone}
          disabled={Boolean(clientId)}
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
