import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {postSignIn, postLogout, getAuth} from './actionCreators';
import {IAuthRes} from '../../models/IAuth';
import {IProfile} from '../../models/IProfile';

const initialState = {
  isReady: false,
  isAuth: false,
  accessToken: '',
  isLoading: false,
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initApp(state) {
      state.isReady = true;
    },
  },
  extraReducers: {
    [postSignIn.fulfilled.type]: (state, action: PayloadAction<IAuthRes>) => {
      state.isLoading = false;
      state.accessToken = action.payload.authToken;
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
    [postLogout.fulfilled.type]: (state) => {
      state.accessToken = '';
      state.isAuth = false;
      state.error = '';
    },
    [postLogout.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getAuth.fulfilled.type]: (state, action: PayloadAction<IProfile>) => {
      state.accessToken = action.payload.token ?? '';
      state.isReady = true;
      state.isAuth = true;
      state.error = '';
    },
    [getAuth.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isReady = true;
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
