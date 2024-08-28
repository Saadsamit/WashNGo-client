import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  id: string | null;
};

const initialState: TInitialState = {
  id: null,
};

const slotSlice = createSlice({
  name: "slot",
  initialState,
  reducers: {
    setId: (state, action) => {
      const id = action.payload;
      state.id = id;
    },
    removeId: (state) => {
      state.id = null;
    },
  },
});

export const { setId, removeId } = slotSlice.actions;

export default slotSlice.reducer;

export const currentSlotId = (state: RootState) => state.slot.id;
