import React, {useEffect, useMemo} from 'react';
import {Typography} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {ClinicsInput} from '@box/entities/multiSelectClinics';
import {useEventsData} from '@box/shared/hooks/useEventsData';
import {useCreateProfileMutation} from '@box/shared/store/services';
import {ModalBase, SubmitButton} from '@box/shared/ui';
import {
  DateOfBirthInput,
  FirstNameInput,
  LastNameInput,
  MiddleNameInput,
  PasswordInput,
  PhoneInput,
  SpecialityInput,
  UserNameInput,
} from '@box/shared/inputs';

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
  role: 'doctor';
  dateOfBirth: string;
  phone: string;
  speciality: string;
  clinic: Array<number>;
};

export const Ui: React.FC<Props> = React.memo(({isVisible, onCloseRequest}) => {
  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: {errors},
  } = useForm<FormState>();
  const [createProfile, {isLoading, isError, isSuccess, reset}] =
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
    console.log('onSubmit ', data);
    createProfile(data);
  };
  useEffect(() => {
    if (isSuccess) {
      reset();
      closeModal();
    }
  }, [isSuccess]);
  return (
    <ModalBase isVisible={isVisible} closeModal={closeModal}>
      <Typography sx={{mb: 4, mt: 4}} textAlign={'center'}>
        Добавить врача
      </Typography>

      <UserNameInput control={control} error={!!errors.username} />
      <PasswordInput control={control} error={!!errors.password} />
      <LastNameInput control={control} error={!!errors.lastName} />
      <FirstNameInput control={control} error={!!errors.firstName} />
      <MiddleNameInput control={control} error={!!errors.middleName} />
      <DateOfBirthInput control={control} error={!!errors.dateOfBirth} />
      <PhoneInput control={control} error={!!errors.phone} />
      <SpecialityInput control={control} error={!!errors.phone} />
      <ClinicsInput
        clinics={clinics}
        control={control}
        error={!!errors.clinic}
        defaultValue={clinic?.id ? [clinic.id] : undefined}
      />

      <SubmitButton
        fullWidth
        sx={{mt: 2}}
        onClick={handleSubmit(onSubmit)}
        variant={'text'}
      >
        Создать
      </SubmitButton>
    </ModalBase>
  );
});
