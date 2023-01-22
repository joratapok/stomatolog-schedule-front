import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export enum ESettingsModals {
  NONE,
  NEW_STUFF,
}

const initialState = {
  modalVision: ESettingsModals.NONE,
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setModal(state, action: PayloadAction<ESettingsModals>) {
      state.modalVision = action.payload;
    },
    closeModal(state) {
      state.modalVision = ESettingsModals.NONE;
    },
  },
});

export default settingSlice.reducer;
