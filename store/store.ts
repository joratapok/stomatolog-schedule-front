import { combineReducers } from 'redux';
import authSlice from './reducers/authSlice';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  authSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
