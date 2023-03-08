import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IClient, IDoctor} from '@box/shared/models';

export enum ESettingsModals {
  NONE,
  NEW_STUFF,
  DETAIL_STUFF,
  REDACTOR_STUFF,
  REDACTOR_CLIENT,
  CREATE_CLIENT,
  CREATE_CABINET,
  ALERT_DELETE_CABINET,
  REDACTOR_CLINIC,
}

export enum MenuItems {
  CLINIC,
  STUFF,
  CLIENTS,
}

const initialState = {
  activeItem: MenuItems.CLINIC,
  modalVision: ESettingsModals.NONE,
  currentStaff: {} as IDoctor,
  currentClient: 0,
  currentClientInfo: {} as IClient,
  currentCabinet: 0,
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setActiveItem(state, action: PayloadAction<MenuItems>) {
      state.activeItem = action.payload;
    },
    setCurrentClient(state, action: PayloadAction<number>) {
      state.currentClient = action.payload;
    },
    setCurrentClientInfo(state, action: PayloadAction<IClient>) {
      state.currentClientInfo = action.payload;
    },
    setModal(state, action: PayloadAction<ESettingsModals>) {
      state.modalVision = action.payload;
    },
    closeModal(state) {
      state.modalVision = ESettingsModals.NONE;
    },
    setCurrentStaff(state, action: PayloadAction<IDoctor>) {
      state.currentStaff = action.payload;
    },
    setCurrentCabinet(state, action: PayloadAction<number>) {
      state.currentCabinet = action.payload;
    },
  },
});

export default settingSlice.reducer;
