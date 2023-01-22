import React, {useEffect, useMemo} from 'react';
import {FormControl, InputLabel, Modal, Typography} from '@mui/material';
import {EventModalContainer} from '../UI/EventModalContainer';
import {CloseButton} from '../UI/buttons/CloseButton';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {EventInput, MuiInput} from '../UI/EventInput';
import {DateMaskInput, PhoneMaskInput} from '../MaskInput';
import {MultipleSelect} from '../UI/multySelect';
import {SubmitButton} from '../UI/buttons/SubmitButton';
import {useEventsData} from '../../hooks/useEventsData';
import {useCreateProfileMutation} from '../../services/profile.api';

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

export const StuffCreatorModal: React.FC<Props> = React.memo(
  ({isVisible, onCloseRequest}) => {
    const {
      setValue,
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
      <Modal
        open={isVisible}
        onClose={(e, reason) => {
          if (reason === 'backdropClick') {
            return;
          }
          closeModal();
        }}
      >
        <EventModalContainer>
          <Typography sx={{mb: 3}} textAlign={'center'}>
            Добавить врача
          </Typography>

          <Controller
            rules={{required: true, maxLength: 100}}
            name={'username'}
            control={control}
            defaultValue={''}
            render={({field: {onChange, onBlur, value}}) => (
              <EventInput
                required
                fullWidth
                label={'Почта'}
                onChange={onChange}
                value={value}
                error={!!errors.username}
                onBlur={onBlur}
                autoCapitalize={'none'}
              />
            )}
          />

          <Controller
            rules={{required: true, maxLength: 100, minLength: 8}}
            name={'password'}
            control={control}
            defaultValue={''}
            render={({field: {onChange, onBlur, value}}) => (
              <EventInput
                required
                fullWidth
                label={'Пароль'}
                onChange={onChange}
                value={value}
                error={!!errors.password}
                onBlur={onBlur}
                autoCapitalize={'none'}
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
            name={'lastName'}
            control={control}
            defaultValue={''}
            render={({field: {onChange, onBlur, value}}) => (
              <EventInput
                required
                fullWidth
                label={'Фамилия'}
                onChange={onChange}
                value={value}
                error={!!errors.lastName}
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
                <InputLabel htmlFor="date-select-label">
                  Дата рождения
                </InputLabel>
                <MuiInput
                  required
                  fullWidth
                  autoComplete={'off'}
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
            name={'phone'}
            control={control}
            defaultValue={''}
            render={({field: {onChange, onBlur, value}}) => (
              <FormControl variant={'outlined'} fullWidth>
                <InputLabel htmlFor="phone-select-label">Телефон</InputLabel>
                <MuiInput
                  required
                  fullWidth
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

          <Controller
            rules={{maxLength: 100}}
            name={'speciality'}
            control={control}
            defaultValue={''}
            render={({field: {onChange, onBlur, value}}) => (
              <EventInput
                fullWidth
                label={'Специальность'}
                onChange={onChange}
                value={value}
                error={!!errors.speciality}
                onBlur={onBlur}
                autoCapitalize={'none'}
              />
            )}
          />

          <Controller
            rules={{required: true}}
            name={'clinic'}
            defaultValue={clinic?.id ? [clinic.id] : undefined}
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <MultipleSelect
                onBlur={onBlur}
                value={value ?? []}
                onChange={onChange}
                clinics={clinics}
                error={!!errors.clinic}
              />
            )}
          />

          <SubmitButton
            fullWidth
            sx={{mt: 2}}
            onClick={handleSubmit(onSubmit)}
            variant={'text'}
          >
            Создать
          </SubmitButton>

          <CloseButton onCloseRequest={closeModal} />
        </EventModalContainer>
      </Modal>
    );
  }
);
