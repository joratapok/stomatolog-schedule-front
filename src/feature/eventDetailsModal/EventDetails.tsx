import React, {useCallback, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Box} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';

import {ServicesTable} from '@box/entities/servicesTable';
import {ServiceSuggestions} from '@box/entities/serviceSuggestions';
import {
  useDeleteEventMutation,
  usePatchEventMutation,
} from '@box/shared/store/services';
import {useAppDispatch, useAppSelector} from '@box/shared/store/hooks';
import {fullNameCreator} from '@box/shared/helpers';
import {useEventsData} from '@box/shared/hooks';
import {EventStatus} from '@box/shared/models/IEvents';
import {ModalBase, SubmitButton, TypoContent} from '@box/shared/ui';
import {useServiceHandler} from './hooks/useServiceHandler';
import {EventStatusInput, ToothNumInput} from '@box/shared/inputs';
import {pdfGetter} from '@box/shared/api/pdfGetter';
import {MenuItems, settingSlice} from '@box/shared/store/reducers';
import {EUrls} from '@box/shared/types';
import {TypoLink} from '@box/shared/ui/TypeLink';

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
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {setActiveItem, setCurrentClient} = settingSlice.actions;
    const [isPDFGetter, setIsPDFGetter] = useState(false);
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
      setService,
      changeCounterService,
      deleteService,
    } = useServiceHandler();
    const closeModal = () => {
      setIsPDFGetter(false);
      onCloseRequest();
      resetForm();
    };
    const onSubmit: SubmitHandler<FormState> = useCallback(
      (data) => {
        const services = localServices.map((el) => ({
          toothNumber: el.toothNumber,
          dentalServices: el.dentalServices.map((el) => el.id),
          count: el.count,
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

    const getPDF = () => {
      pdfGetter(id).catch((e) => console.log('get pdf error ', e));
    };

    const goToClient = (id: number) => {
      dispatch(setActiveItem(MenuItems.CLIENTS));
      dispatch(setCurrentClient(id));
      closeModal();
      router
        .push(EUrls.SETTINGS)
        .catch((e) => console.log('redirect sign_in error', e));
    };

    useEffect(() => {
      if (isPDFGetter) {
        handleSubmit(onSubmit)();
      }
    }, [isPDFGetter]);

    useEffect(() => {
      if (services) {
        setServices(services);
      }
    }, [services]);

    useEffect(() => {
      if (isSuccess && isPDFGetter) {
        getPDF();
        setIsPDFGetter(false);
      } else if (isSuccess) {
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
        <Box sx={{display: 'flex', mb: 2}}>
          <TypoContent sx={{mr: 1}}>Клиент:</TypoContent>
          <TypoLink onClick={() => goToClient(client.id)}>
            {`${client.lastName} ${client.firstName} ${client.middleName}`}
          </TypoLink>
        </Box>

        <EventStatusInput control={control} defaultValue={status} />
        <ToothNumInput
          toothNumber={toothNumber}
          onChangeRequest={setToothNumber}
        />
        <ServiceSuggestions setService={setService} toothNumber={toothNumber} />
        <ServicesTable
          services={localServices}
          deleteService={deleteService}
          changeCounter={changeCounterService}
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: {xs: 'column', md: 'row'},
            mt: 5,
          }}
        >
          <SubmitButton
            onClick={handleSubmit(onSubmit)}
            loading={isLoading}
            variant={'text'}
          >
            Сохранить
          </SubmitButton>
          <SubmitButton
            disabled={!localServices.length}
            loading={isLoading && isPDFGetter}
            onClick={() => setIsPDFGetter(true)}
            variant={'text'}
          >
            Счет
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
