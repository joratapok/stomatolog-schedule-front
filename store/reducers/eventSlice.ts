import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {StateEventInit} from '../../types/types';

const initialState = {
  cabinetId: 0,
  timeStart: 0,
  isVisibleModal: false,
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setInitialEvent(state, action: PayloadAction<StateEventInit>) {
      state.cabinetId = action.payload.cabinetId;
      state.timeStart = action.payload.timeStart;
    },
    showModal(state) {
      state.isVisibleModal = true;
    },
    closeModal(state) {
      state.isVisibleModal = false;
    },
  },
});

export default eventSlice.reducer;
