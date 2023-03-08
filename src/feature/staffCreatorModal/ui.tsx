import React, {useEffect, useMemo, useState} from 'react';
import {Typography} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {ClinicsInput} from '@box/entities/multiSelectClinics';
import {useEventsData} from '@box/shared/hooks/useEventsData';
import {useCreateProfileMutation} from '@box/shared/store/services';
import {ErrorMessage, ModalBase, SubmitButton} from '@box/shared/ui';
import {
  DateOfBirthInput,
  FirstNameInput,
  LastNameInput,
  MiddleNameInput,
  PasswordInput,
  PhoneInput,
  SpecialityInput,
  UserNameInput,
  RoleInput,
} from '@box/shared/inputs';
import {useInFormErrorSetter} from '@box/shared/hooks/useInFormErrorSetter';

type Props = {
  isVisible: boolean;
  onCloseRequest: () => void;
};

type FormState = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
  role: 'doctor' | 'administrator';
  dateOfBirth: string;
  phone: string;
  speciality?: string;
  clinic: Array<number>;
};

export const StaffCreatorModal: React.FC<Props> = React.memo(
  ({isVisible, onCloseRequest}) => {
    const [isDoctor, setIsDoctor] = useState(true);
    const {
      setError,
      control,
      handleSubmit,
      reset: resetForm,
      formState: {errors},
    } = useForm<FormState>({
      defaultValues: {role: 'doctor'},
    });
    const [createProfile, {isLoading, isError, error, isSuccess, reset}] =
      useCreateProfileMutation();
    const {data, clinic} = useEventsData();
    const clinics = useMemo(() => {
      const result = data?.map((c) => ({id: c.id, name: c.title}));
      return result ?? [];
    }, [data]);
    const closeModal = () => {
      resetForm();
      onCloseRequest();
    };
    const onSubmit: SubmitHandler<FormState> = (data) => {
      createProfile({...data, isActive: true});
    };
    useInFormErrorSetter<FormState>({error, setError});
    useEffect(() => {
      if (isSuccess) {
        reset();
        closeModal();
      }
    }, [isSuccess]);
    return (
      <ModalBase isVisible={isVisible} closeModal={closeModal}>
        <Typography sx={{mb: 4, mt: 4}} textAlign={'center'}>
          Добавить сотрудника
        </Typography>
        <RoleInput control={control} setIsDoctor={setIsDoctor} />
        {isDoctor && (
          <SpecialityInput control={control} error={!!errors.speciality} />
        )}

        <UserNameInput control={control} error={!!errors.username} />
        <PasswordInput control={control} error={errors.password} />
        <LastNameInput control={control} error={!!errors.lastName} />
        <FirstNameInput control={control} error={!!errors.firstName} />
        <MiddleNameInput control={control} error={!!errors.middleName} />
        <DateOfBirthInput control={control} error={errors.dateOfBirth} />
        <PhoneInput control={control} error={errors.phone} />
        <ClinicsInput
          clinics={clinics}
          control={control}
          error={!!errors.clinic}
          defaultValue={clinic?.id ? [clinic.id] : undefined}
        />

        <ErrorMessage
          isError={isError}
          message={'Ошибка при создании сотрудника'}
          inCenter
        />

        <SubmitButton
          fullWidth
          sx={{mt: 2}}
          loading={isLoading}
          onClick={handleSubmit(onSubmit)}
          variant={'text'}
        >
          Создать
        </SubmitButton>
      </ModalBase>
    );
  }
);
