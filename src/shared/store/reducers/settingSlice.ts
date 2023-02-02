import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IDoctor} from '@box/shared/models';

export enum ESettingsModals {
  NONE,
  NEW_STUFF,
  DETAIL_STUFF,
}

const initialState = {
  modalVision: ESettingsModals.NONE,
  currentStaff: {} as IDoctor,
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
    setCurrentStaff(state, action: PayloadAction<IDoctor>) {
      state.currentStaff = action.payload;
    },
  },
});

export default settingSlice.reducer;
