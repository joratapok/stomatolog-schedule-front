import React, {FC, useEffect} from 'react';
import {Typography} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {
  DateOfBirthInput,
  FirstNameInput,
  LastNameBaseInput,
  MiddleNameInput,
  PhoneInput,
} from '@box/shared/inputs';
import {useInFormErrorSetter} from '@box/shared/hooks';
import {usePatchClientMutation} from '@box/shared/store/services';
import {useAppSelector} from '@box/shared/store/hooks';
import {DiscountInput} from '@box/shared/inputs/DiscountInput';
import {ErrorMessage, ModalBase, SubmitButton} from '@box/shared/ui';

type Props = {
  isVisible: boolean;
  onCloseRequest: () => void;
};

type FormState = {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  discount: number;
};

export const ClientRedactorModal: FC<Props> = ({isVisible, onCloseRequest}) => {
  const {currentClientInfo} = useAppSelector((state) => state.settingSlice);
  const [patchClient, {isLoading, isError, error, isSuccess, reset}] =
    usePatchClientMutation();
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
    patchClient({...data, id: currentClientInfo?.id ?? 0});
  };
  const closeModal = () => {
    resetForm();
    onCloseRequest();
  };
  useInFormErrorSetter<FormState>({error, setError});
  useEffect(() => {
    setValue('firstName', currentClientInfo?.firstName);
    setValue('middleName', currentClientInfo?.middleName);
    setValue('lastName', currentClientInfo?.lastName);
    setValue('dateOfBirth', currentClientInfo?.dateOfBirth);
    setValue('phone', currentClientInfo?.phone);
    setValue('discount', currentClientInfo?.discount);
  }, [currentClientInfo]);
  useEffect(() => {
    if (isSuccess) {
      reset();
      closeModal();
    }
  }, [isSuccess]);

  return (
    <ModalBase isVisible={isVisible} closeModal={closeModal}>
      <Typography sx={{mb: 3, mt: 5, mx: 4}} textAlign={'center'}>
        Редактировать данные клиента
      </Typography>

      <LastNameBaseInput control={control} error={errors.lastName} />
      <FirstNameInput control={control} error={!!errors.firstName} />
      <MiddleNameInput control={control} error={!!errors.middleName} />
      <DateOfBirthInput control={control} error={errors.dateOfBirth} />
      <PhoneInput control={control} error={errors.phone} />
      <DiscountInput control={control} error={errors.discount} />

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
