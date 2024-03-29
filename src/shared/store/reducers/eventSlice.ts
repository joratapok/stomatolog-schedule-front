import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  IServiceList,
  ICabinet,
  CabinetEvent,
  EventStatus,
} from '@box/shared/models';

export type InitCreateEvent = {
  cabinet: ICabinet;
  timeStart: string;
  doctor?: number;
};

const initialState = {
  newEvent: {
    dateStart: '',
    dateFinish: '',
    service: '',
    status: 'not_confirmed',
    color: '',
    cabinet: {
      id: 0,
      name: '',
    },
    client: 0,
    doctor: 0,
  },
  activeClinic: 0,
  tablePeriod: 30,
  roundTheClock: false,
  isVisibleModal: false,
  isVisibleCreatorDuty: false,
  isVisibleEventDetails: false,
  newDuty: {
    cabinetName: '',
    cabinetId: 0,
  },
  cabinetDetails: '',
  eventDetails: {
    id: 0,
    dateStart: '',
    dateFinish: '',
    services: [] as IServiceList,
    comment: '',
    status: EventStatus.NOT_CONFIRMED,
    client: {
      id: 0,
      firstName: '',
      lastName: '',
      middleName: '',
    },
    doctor: 0,
  },
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    initCreateEvent(state, action: PayloadAction<InitCreateEvent>) {
      state.newEvent.cabinet = action.payload.cabinet;
      state.newEvent.dateStart = action.payload.timeStart;
      state.newEvent.doctor = action.payload.doctor ?? 0;
    },
    setActiveClinic(state, action: PayloadAction<number>) {
      state.activeClinic = action.payload;
    },
    setTablePeriod(state, action: PayloadAction<number>) {
      state.tablePeriod = action.payload;
    },
    setRoundTheClock(state, action: PayloadAction<boolean>) {
      state.roundTheClock = action.payload;
    },
    showModal(state) {
      state.isVisibleModal = true;
    },
    closeModal(state) {
      state.isVisibleModal = false;
    },
    initNewDuty(state, action: PayloadAction<ICabinet>) {
      state.newDuty.cabinetName = action.payload.name;
      state.newDuty.cabinetId = action.payload.id;
    },
    showCreatorDuty(state) {
      state.isVisibleCreatorDuty = true;
    },
    closeCreatorDuty(state) {
      state.isVisibleCreatorDuty = false;
    },
    setEventDetails(
      state,
      action: PayloadAction<{event: CabinetEvent; cabinet: string}>
    ) {
      // @ts-ignore
      state.eventDetails = action.payload.event;
      state.cabinetDetails = action.payload.cabinet;
    },
    showEventDetails(state) {
      state.isVisibleEventDetails = true;
    },
    closeEventDetails(state) {
      state.isVisibleEventDetails = false;
    },
  },
});

export default eventSlice.reducer;
