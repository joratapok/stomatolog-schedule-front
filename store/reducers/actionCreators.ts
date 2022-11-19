import {createAsyncThunk} from '@reduxjs/toolkit';
import {IAuthReq} from '../../models/IAuth';
import {authApi} from '../../api/authApi';

export const postSignIn = createAsyncThunk(
  'signIn/post',
  async (userData: IAuthReq, thunkAPI) => {
    try {
      const response = await authApi.login(userData);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Sign in failed');
    }
  }
);
