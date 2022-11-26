import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getAuth} from './actionCreators';
import {IProfile} from '../../models/IProfile';

const initialState: IProfile = {
  username: '',
  firstName: '',
  lastName: '',
  profile: {
    middleName: '',
    role: '',
    dateOfBirth: '',
    phone: '',
    image: '',
    speciality: '',
    clinic: [],
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [getAuth.fulfilled.type]: (state, action: PayloadAction<IProfile>) => {
      state.firstName = action.payload.firstName;
    },
  },
});

export default userSlice.reducer;
