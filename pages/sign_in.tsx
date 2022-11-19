import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm, Controller} from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import {FormContainer} from '../components/UI/FormContainer';
import {AuthInput} from '../components/UI/AuthInput';
import {SubmitButton} from '../components/UI/buttons/SubmitButton';
import {ContainerInline} from '../components/UI/ContainerInline';
import {ContainerCenter} from '../components/UI/ContainerCenter';
import {ContainerCenterGrow} from '../components/UI/ContainerCenterGrow';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {postSignIn} from '../store/reducers/actionCreators';
import {IAuthReq} from '../models/IAuth';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {useRouter} from 'next/router';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {isLoading, accessToken} = useAppSelector((state) => state.authSlice);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IAuthReq>();
  const onSubmit: SubmitHandler<IAuthReq> = (data) => {
    console.log('submit', data);
    dispatch(postSignIn(data));
  };
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  useEffect(() => {
    if (accessToken) {
      router.push('/');
    }
  }, [accessToken]);
  return (
    <ContainerCenterGrow>
      <ContainerCenter>
        <ContainerInline>
          <FormContainer>
            <Controller
              rules={{required: true}}
              name={'username'}
              control={control}
              defaultValue={''}
              render={({field: {onChange, onBlur, value}}) => (
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Логин
                  </InputLabel>
                  <AuthInput
                    required
                    label={'Почта'}
                    onChange={onChange}
                    value={value}
                    error={!!errors.username}
                    onBlur={onBlur}
                    autoCapitalize={'none'}
                  />
                </FormControl>
              )}
            />
            {/*<input placeholder={'Почта'}
            {...register('name', {required: true})} />*/}
            <Controller
              rules={{required: true}}
              name={'password'}
              control={control}
              defaultValue={''}
              render={({field: {onChange, onBlur, value}}) => (
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Пароль
                  </InputLabel>
                  <AuthInput
                    required
                    type={showPassword ? 'text' : 'password'}
                    label={'Пароль'}
                    onChange={onChange}
                    value={value}
                    error={!!errors.password}
                    onBlur={onBlur}
                    autoCapitalize={'none'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              )}
            />
            <SubmitButton
              onClick={handleSubmit(onSubmit)}
              variant={'text'}
              loading={isLoading}
            >
              Войти
            </SubmitButton>
            <FormHelperText hidden={true} error={true}>
              {true && 'тут будем показывать ощибки'}
            </FormHelperText>
          </FormContainer>
        </ContainerInline>
      </ContainerCenter>
    </ContainerCenterGrow>
  );
};

export default SignIn;
