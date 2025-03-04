import { createSlice } from '@reduxjs/toolkit';
import { variantsBase, type ParametersState } from './types';
import { RootState } from '../../appStore';

const initialState: ParametersState = {
  gifts: [],
  variant: null,
};

export const parametersSlice = createSlice({
  name: 'parameters',
  initialState,
  reducers: {
    setGifts: (state, action) => {
      state.gifts = action.payload;
    },
    setVariant: (state, action) => {
      state.variant = action.payload;
    },
    clearGifts: (state) => {
      state.gifts = [];
    },
    clearVariant: (state) => {
      state.variant = variantsBase[0];
    },
  },
});

export const selectGifts = (state: RootState) => state.parameters.gifts;
export const selectVariant = (state: RootState) => state.parameters.variant;

export const { setGifts, setVariant, clearGifts, clearVariant } =
  parametersSlice.actions;
