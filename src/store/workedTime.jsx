import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const workedTimeStore = createSlice({
  name: "WorkedTime",
  initialState,
  reducers: {
    setTime: (state, action) => {
      state.value = action.payload;
    },
    resetTime: (state) => {
      state.value = 0;
    }
  },
});

export const { setTime, resetTime } = workedTimeStore.actions;

export default workedTimeStore.reducer;
