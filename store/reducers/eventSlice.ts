import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {StateDate} from '../../types/types';

const initialState = {
  date: Date.now(),
  dateText: '',
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setDate(state, action: PayloadAction<StateDate>) {
      state.date = action.payload.date;
      state.dateText = action.payload.dateText;
    },
  },
});

export default eventSlice.reducer;
