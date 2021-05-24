import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import groupsReducer from 'store/slices/groupsSlice';
import teamsReducer from 'store/slices/teamsSlice';

const combinedReducer = combineReducers({
  groups: groupsReducer,
  teams: teamsReducer,
});

const middlewares = [...getDefaultMiddleware()];

export const store = configureStore({
  reducer: combinedReducer,
  middleware: middlewares,
  devTools: process.env.REACT_APP_ENVIRONMENT === 'localhost',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, any, Action<string>>;

