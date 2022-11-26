import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {instance} from './api';
import {EUrls} from '../types/urls';
import {getAuth} from '../store/reducers/actionCreators';
import {authSlice} from '../store/reducers/authSlice';

export const AuthTokenSetter = ({children}: any) => {
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
  });
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
