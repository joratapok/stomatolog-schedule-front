import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SignInResponse } from '../../types/types';

export const postSignIn = createAsyncThunk(
  'signIn/post',
  async (_, thunkAPI) => {
    try {
      const response = await axios.post<SignInResponse>('');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Sign in failed');
    }
  }
);
