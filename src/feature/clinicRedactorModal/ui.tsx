import React, {FC, useCallback, useEffect} from 'react';
import {Typography} from '@mui/material';
import {ErrorMessage, ModalBase, SubmitButton} from '@box/shared/ui';
import {SubmitHandler, useForm} from 'react-hook-form';
import {TimeInput} from '@box/shared/inputs';
import {useEventsData} from '@box/shared/hooks';
import {usePatchClinicMutation} from '@box/shared/store/services';
import {isAfter, parse} from 'date-fns';
import {useInFormErrorSetter} from '@box/shared/hooks/useInFormErrorSetter';
import {CustomStringInput} from '@box/shared/inputs/CustomStringInput';

type Props = {
  isVisible: boolean;
  onCloseRequest: () => void;
};

type FormState = {
  startOfTheDay: string;
  endOfTheDay: string;
  phone: string;
  errorTime?: string;
};

export const ClinicRedactorModal: FC<Props> = ({isVisible, onCloseRequest}) => {
  const {clinicInfo} = useEventsData();
  const [patchProfile, {isLoading, isError, error, isSuccess, reset}] =
    usePatchClinicMutation();
  const {
    setError,
    clearErrors,
    setValue,
    control,
    handleSubmit,
    reset: resetForm,
    formState: {errors},
  } = useForm<FormState>({
    defaultValues: {},
  });
  const clearErrorsRequest = useCallback(() => {
    clearErrors('errorTime');
  }, [clearErrors]);
  const onSubmit: SubmitHandler<FormState> = (data) => {
    const dateFrom = parse(data.startOfTheDay, 'HH:mm', Date.now());
    const dateFinish = parse(data.endOfTheDay, 'HH:mm', Date.now());
    if (!isAfter(dateFinish, dateFrom)) {
      setError('errorTime', {
        type: 'server',
        message: 'Некорректно задано время',
      });
      return;
    }

    patchProfile({...data, id: clinicInfo?.id ?? 0});
  };
  const closeModal = () => {
    resetForm();
    onCloseRequest();
  };
  useInFormErrorSetter<FormState>({error, setError});
  useEffect(() => {
    setValue('phone', clinicInfo?.phone ?? '');
    setValue('startOfTheDay', clinicInfo?.startOfTheDay ?? '09:00');
    setValue('endOfTheDay', clinicInfo?.endOfTheDay ?? '18:00');
  }, [clinicInfo]);
  useEffect(() => {
    if (isSuccess) {
      reset();
      closeModal();
    }
  }, [isSuccess]);
  return (
    <ModalBase isVisible={isVisible} closeModal={closeModal}>
      <Typography sx={{mb: 3, mt: 5, mx: 4}} textAlign={'center'}>
        Редактировать данные клиники
      </Typography>

      <TimeInput
        name={'startOfTheDay'}
        label={'Время начала'}
        control={control}
        error={errors.startOfTheDay}
        clearErrors={clearErrorsRequest}
      />
      <TimeInput
        name={'endOfTheDay'}
        label={'Время завершения'}
        control={control}
        error={errors.endOfTheDay}
        clearErrors={clearErrorsRequest}
      />

      <CustomStringInput
        control={control}
        name={'phone'}
        label={'Телефон'}
        error={errors.phone}
      />

      <ErrorMessage
        isError={isError || Boolean(errors?.errorTime?.message)}
        message={
          errors?.errorTime?.message ?? 'Ошибка при сохранении информации'
        }
        inCenter
      />

      <SubmitButton
        fullWidth
        sx={{mt: 2}}
        loading={isLoading}
        onClick={handleSubmit(onSubmit)}
        variant={'text'}
      >
        Сохранить
      </SubmitButton>
    </ModalBase>
  );
};
