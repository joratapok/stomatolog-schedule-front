import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm, Controller} from 'react-hook-form';
import {useRouter} from 'next/router';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import {
  ContainerCenterGrow,
  ContainerCenter,
  ContainerInline,
  SubmitButton,
  AuthInput,
  FormContainer,
} from '@box/shared/ui';
import {useAppDispatch, useAppSelector} from '@box/shared/store/hooks';
import {postSignIn} from '@box/shared/store/reducers';
import {IAuthReq} from '@box/shared/models';

import {EUrls} from '@box/shared/types/urls';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {isLoading, accessToken, error} = useAppSelector(
    (state) => state.authSlice
  );
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IAuthReq>();
  const onSubmit: SubmitHandler<IAuthReq> = (data) => {
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
      router
        .push(EUrls.HOME_PAGE)
        .catch((e) => console.log('redirect to home error', e));
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
              defaultValue={'test_user'}
              render={({field: {onChange, onBlur, value}}) => (
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-login">
                    Почта
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
            <Controller
              rules={{required: true}}
              name={'password'}
              control={control}
              defaultValue={'qwe123!@#'}
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
            <FormHelperText hidden={!error} error={true}>
              {error}
            </FormHelperText>
          </FormContainer>
        </ContainerInline>
      </ContainerCenter>
    </ContainerCenterGrow>
  );
};

export default SignIn;
