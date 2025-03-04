import { combineReducers } from '@reduxjs/toolkit';
import { mockApi } from '../api/mockApi';
import { parametersSlice } from './parameters';
export const rootReducer = combineReducers({
  [mockApi.reducerPath]: mockApi.reducer,
  [parametersSlice.name]: parametersSlice.reducer,
});
