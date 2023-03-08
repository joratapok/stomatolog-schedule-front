import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useAppDispatch, useAppSelector} from '@box/shared/store/hooks';
import {getAuth, authSlice} from '@box/shared/store/reducers';
import {instance} from '@box/shared/api';
import {EUrls} from '@box/shared/types';

export const AuthTokenSetter = ({children}: React.PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const {accessToken, isReady} = useAppSelector((state) => state.authSlice);
  const {initApp} = authSlice.actions;
  const router = useRouter();
  /*
   * Logout handler
   */
  useEffect(() => {
    if (!accessToken && isReady) {
      instance.defaults.headers.common['Authorization'] = false;
      localStorage.setItem('token', accessToken);
      router
        .push(EUrls.SIGN_IN)
        .catch((e) => console.log('redirect sign_in error', e));
    }
  }, [accessToken, isReady]);
  /*
   * Login handler
   */
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('token', accessToken);
      instance.defaults.headers.common[
        'Authorization'
      ] = `Token ${accessToken}`;
      dispatch(getAuth());
    }
  }, [accessToken]);
  /*
   * Initial auth
   */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      instance.defaults.headers.common['Authorization'] = `Token ${token}`;
      dispatch(getAuth());
    } else {
      dispatch(initApp());
    }
  }, []);
  return <>{children}</>;
};
