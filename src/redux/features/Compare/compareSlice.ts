import { RootState } from "@/redux/store";
import { TService } from "@/Types";
import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  item1: null | TService;
  item2: null | TService;
};

const initialState: TInitialState = {
  item1: null,
  item2: null,
};

const compareSlice = createSlice({
  name: "compareService",
  initialState,
  reducers: {
    addCompareServie: (state, action) => {
      const { data } = action.payload;
      if (!state.item1) {
        state.item1 = data;
        return state;
      }
      state.item2 = data;
      return state;
    },
    removeCompareServie: (state) => {
      state.item1 = null;
      state.item2 = null;
      return state;
    },
  },
});

export const { addCompareServie, removeCompareServie } = compareSlice.actions;

export default compareSlice.reducer;

export const compareService = (state: RootState) => state.compareService;
