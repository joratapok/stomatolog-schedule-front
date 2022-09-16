import React from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import {FormHelperText, TextField} from '@mui/material';
import {FormContainer} from '../components/UI/FormContainer';
import {AuthInput} from '../components/UI/AuthInput';
import {SubmitButton} from '../components/UI/buttons/SubmitButton';
import {ContainerInline} from '../components/UI/ContainerInline';
import {ContainerCenter} from '../components/UI/ContainerCenter';
import {ContainerCenterGrow} from '../components/UI/ContainerCenterGrow';

type Inputs = {
  name: string;
  password: string;
};

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('submit', data);
  };
  return (
    <ContainerCenterGrow>
      <ContainerCenter>
        <ContainerInline>
          <FormContainer>
            <Controller
              rules={{ required: true }}
              name={'name'}
              control={control}
              defaultValue={''}
              render={({ field: { onChange, onBlur, value } }) => (
                <AuthInput
                  required
                  label={'Почта'}
                  onChange={onChange}
                  value={value}
                  error={!!errors.name}
                  onBlur={onBlur}
                  autoCapitalize={'none'}
                />
              )}
            />
            {/*<input placeholder={'Почта'}
            {...register('name', {required: true})} />*/}
            <Controller
              rules={{ required: true }}
              name={'password'}
              control={control}
              defaultValue={''}
              render={({ field: { onChange, onBlur, value } }) => (
                <AuthInput
                  required
                  label={'Пароль'}
                  onChange={onChange}
                  value={value}
                  error={!!errors.password}
                  onBlur={onBlur}
                  autoCapitalize={'none'}
                />
              )}
            />
            <SubmitButton onClick={handleSubmit(onSubmit)} variant={'contained'}>
              Войти
            </SubmitButton>
            <FormHelperText error={true}>
              Some strange error occur
            </FormHelperText>
          </FormContainer>
        </ContainerInline>
      </ContainerCenter>
    </ContainerCenterGrow>
  );
};

export default SignIn;
