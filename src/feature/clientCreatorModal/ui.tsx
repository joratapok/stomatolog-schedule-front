import React, {FC, useEffect} from 'react';
import {Typography} from '@mui/material';
import {ErrorMessage, ModalBase, SubmitButton} from '@box/shared/ui';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useCreateClientMutation} from '@box/shared/store/services';
import {
  DateOfBirthInput,
  FirstNameInput,
  MiddleNameInput,
  PhoneInput,
  LastNameBaseInput,
  GenderInput,
} from '@box/shared/inputs';
import {settingSlice} from '@box/shared/store/reducers';
import {useAppDispatch, useAppSelector} from '@box/shared/store/hooks';
import {DiscountInput} from '@box/shared/inputs/DiscountInput';
import {useEventsData} from '@box/shared/hooks';

type Props = {
  isVisible: boolean;
  onCloseRequest: () => void;
};

type FormState = {
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: string;
  phone: string;
  gender: 'male' | 'female';
  discount?: number;
};

export const ClientCreatorModal: FC<Props> = ({isVisible, onCloseRequest}) => {
  const dispatch = useAppDispatch();
  const {setCurrentClient} = settingSlice.actions;
  const {clinic} = useEventsData();
  const [createClient, {isLoading, data, isError, error, isSuccess, reset}] =
    useCreateClientMutation();
  const {
    setError,
    control,
    handleSubmit,
    reset: resetForm,
    formState: {errors},
  } = useForm<FormState>({
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<FormState> = (data) => {
    createClient({...data, clinic: clinic?.id ?? 0});
  };
  const closeModal = () => {
    resetForm();
    onCloseRequest();
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCurrentClient(data?.id ?? 0));
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
        Создать клиента
      </Typography>
      <LastNameBaseInput control={control} error={errors.lastName} />
      <FirstNameInput control={control} error={!!errors.firstName} />
      <MiddleNameInput control={control} error={!!errors.middleName} />
      <GenderInput control={control} />
      <DateOfBirthInput control={control} error={errors.dateOfBirth} />
      <PhoneInput control={control} error={errors.phone} />
      <DiscountInput
        defaultValue={0}
        control={control}
        error={errors.discount}
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
