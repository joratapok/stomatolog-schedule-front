import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice';
import eventSlice from './reducers/eventSlice';
import calendarSlice from './reducers/calendarSlice';
import userSlice from './reducers/userSlice';
import {api} from '../services/rtkBaseApi';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  authSlice,
  eventSlice,
  calendarSlice,
  userSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
