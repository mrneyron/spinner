import { combineReducers } from '@reduxjs/toolkit';
import { mockApi } from '../api/mockApi';

export const rootReducer = combineReducers({
  [mockApi.reducerPath]: mockApi.reducer,

});
