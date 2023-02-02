import {createAsyncThunk} from '@reduxjs/toolkit';
import {authApi} from '@box/shared/api';
import {IAuthReq} from '@box/shared/models';

export const postSignIn = createAsyncThunk(
  'signIn/post',
  async (userData: IAuthReq, thunkAPI) => {
    try {
      const response = await authApi.login(userData);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Ошибка авторизации');
    }
  }
);

export const postLogout = createAsyncThunk(
  'logout/post',
  async (_, thunkAPI) => {
    try {
      await authApi.logout();
    } catch (e) {
      return thunkAPI.rejectWithValue('Ошибка при выхода из профиля');
    }
  }
);

export const getAuth = createAsyncThunk('auth/get', async (_, thunkAPI) => {
  try {
    const response = await authApi.auth();
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Ошибка авторизации');
  }
});
