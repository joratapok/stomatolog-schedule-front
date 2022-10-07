import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice';
import eventSlice from './reducers/eventSlice';
import calendarSlice from './reducers/calendarSlice';

const rootReducer = combineReducers({
  authSlice,
  eventSlice,
  calendarSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
