import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ERoles, IProfile} from '@box/shared/models';
import {getAuth, postLogout} from './actionCreators';

const initialState: IProfile = {
  username: '',
  firstName: '',
  lastName: '',
  middleName: '',
  role: ERoles.doctor,
  dateOfBirth: '',
  phone: '',
  image: '',
  speciality: '',
  clinic: [],
  token: '',
  isActive: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [getAuth.fulfilled.type]: (state, action: PayloadAction<IProfile>) => {
      state.username = action.payload.username;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.middleName = action.payload.middleName;
      state.role = action.payload.role;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.phone = action.payload.phone;
      state.image = action.payload.image;
      state.speciality = action.payload.speciality;
      state.clinic = action.payload.clinic;
      state.token = action.payload.token;
      state.isActive = action.payload.isActive;
    },
    [postLogout.fulfilled.type]: () => {
      return initialState;
    },
  },
});

export default userSlice.reducer;
