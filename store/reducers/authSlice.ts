import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postSignIn } from './actionCreators';
import { SignInResponse } from '../../types/types';

const initialState = {
  isAuth: true,
  assesToken: '',
  refreshToken: '',
  isLoading: false,
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [postSignIn.fulfilled.type]: (
      state,
      action: PayloadAction<SignInResponse>
    ) => {
      state.isLoading = false;
      state.assesToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuth = true;
      state.error = '';
    },
    [postSignIn.pending.type]: (state) => {
      state.isLoading = true;
    },
    [postSignIn.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
