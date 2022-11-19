import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {postSignIn} from './actionCreators';
import {IAuthRes} from '../../models/IAuth';

const initialState = {
  isAuth: true,
  accessToken: '',
  isLoading: false,
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [postSignIn.fulfilled.type]: (state, action: PayloadAction<IAuthRes>) => {
      state.isLoading = false;
      state.accessToken = action.payload.auth_token;
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
