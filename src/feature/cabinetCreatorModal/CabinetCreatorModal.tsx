import React, {FC, useEffect} from 'react';
import {Typography} from '@mui/material';
import {
  ErrorMessage,
  EventInput,
  InputContainer,
  ModalBase,
  SubmitButton,
} from '@box/shared/ui';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useCreateCabinetsMutation} from '@box/shared/store/services';
import {useEventsData, useInFormErrorSetter} from '@box/shared/hooks';

type Props = {
  isVisible: boolean;
  onCloseRequest: () => void;
};

type FormState = {
  name: string;
};

export const CabinetCreatorModal: FC<Props> = ({isVisible, onCloseRequest}) => {
  const {clinic} = useEventsData();
  const [createCabinet, {isLoading, isError, error, isSuccess, reset}] =
    useCreateCabinetsMutation();
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
    createCabinet({...data, clinic: clinic?.id ?? 0});
  };
  const closeModal = () => {
    resetForm();
    onCloseRequest();
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
      <Typography sx={{mb: 3, mt: 5, mx: 4}} textAlign={'center'}>
        Создать кабинет
      </Typography>
      <Controller
        rules={{required: true, maxLength: 100}}
        name={'name'}
        control={control}
        defaultValue={''}
        render={({field: {onChange, onBlur, value}}) => (
          <InputContainer>
            <EventInput
              required
              fullWidth
              label={'Кабинет'}
              onChange={onChange}
              value={value}
              error={!!errors.name}
              onBlur={onBlur}
              autoCapitalize={'none'}
            />
          </InputContainer>
        )}
      />
      <ErrorMessage
        isError={isError}
        message={'Ошибка запроса на создание кабинета'}
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
