import React, {FC, useEffect, useMemo} from 'react';
import {Typography} from '@mui/material';
import {ErrorMessage, ModalBase, SubmitButton} from '@box/shared/ui';
import {SubmitHandler, useForm} from 'react-hook-form';
import {ClinicsInput} from '@box/entities/multiSelectClinics';
import {useAppSelector} from '@box/shared/store/hooks';
import {useEventsData} from '@box/shared/hooks';
import {usePatchProfileMutation} from '@box/shared/store/services';
import {
  DateOfBirthInput,
  FirstNameInput,
  LastNameInput,
  MiddleNameInput,
  PhoneInput,
  SpecialityInput,
} from '@box/shared/inputs';

type Props = {
  isVisible: boolean;
  onCloseRequest: () => void;
};

type FormState = {
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  role?: 'doctor' | 'administrator';
  dateOfBirth?: string;
  phone?: string;
  speciality?: string;
  clinic?: Array<number>;
};

export const StaffRedactorModal: FC<Props> = ({isVisible, onCloseRequest}) => {
  const {currentStaff} = useAppSelector((state) => state.settingSlice);
  const isDoctor = currentStaff.role === 'doctor';
  const {data, clinic} = useEventsData();
  const [patchProfile, {isLoading, isError, error, isSuccess, reset}] =
    usePatchProfileMutation();
  const clinics = useMemo(() => {
    const result = data?.map((c) => ({id: c.id, name: c.title}));
    return result ?? [];
  }, [data]);
  const {
    setError,
    setValue,
    control,
    handleSubmit,
    reset: resetForm,
    formState: {errors},
  } = useForm<FormState>({
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<FormState> = (data) => {
    patchProfile({...data, id: currentStaff.id});
  };
  const closeModal = () => {
    resetForm();
    onCloseRequest();
  };
  useEffect(() => {
    setValue('lastName', currentStaff.lastName);
    setValue('firstName', currentStaff.firstName);
    setValue('middleName', currentStaff.middleName);
    setValue('dateOfBirth', currentStaff.dateOfBirth);
    setValue('phone', currentStaff.phone);
    setValue('clinic', currentStaff.clinic);
    if (isDoctor) {
      setValue('speciality', currentStaff.speciality);
    }
  }, [currentStaff]);
  useEffect(() => {
    if (isSuccess) {
      reset();
      closeModal();
    }
  }, [isSuccess]);
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
  return (
    <ModalBase isVisible={isVisible} closeModal={closeModal}>
      <Typography sx={{mb: 3, mt: 5, mx: 4}} textAlign={'center'}>
        Редактировать данные сотрудника
      </Typography>
      <Typography sx={{my: 2}}>{currentStaff.username}</Typography>
      <LastNameInput
        control={control}
        error={!!errors.lastName}
        defaultValue={currentStaff.lastName}
      />
      <FirstNameInput control={control} error={!!errors.firstName} />
      <MiddleNameInput control={control} error={!!errors.middleName} />
      <DateOfBirthInput control={control} error={errors.dateOfBirth} />
      {isDoctor && (
        <SpecialityInput control={control} error={!!errors.speciality} />
      )}
      <PhoneInput control={control} error={errors.phone} />
      <ClinicsInput
        clinics={clinics}
        control={control}
        error={!!errors.clinic}
        defaultValue={clinic?.id ? [clinic.id] : undefined}
      />
      <ErrorMessage
        isError={isError}
        message={'Ошибка запроса на изменение информации'}
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
