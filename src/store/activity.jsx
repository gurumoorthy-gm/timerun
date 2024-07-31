import { createSlice } from "@reduxjs/toolkit";
import { dayActivity } from "../common/constant";

const initialState = {
  value: dayActivity.start,
};

export const activityStore = createSlice({
  name: "activity",
  initialState,
  reducers: {
    breakTime: (state) => {
      state.value = dayActivity.break;
    },
    pause: (state) => {
      state.value = dayActivity.pause;
    },
    end: (state) => {
      state.value = dayActivity.end;
    },
    resume: (state) => {
      state.value = dayActivity.resume;
    },
    working: (state) => {
      state.value = dayActivity.working;
    },
    start: (state) => {
      state.value = dayActivity.start;
    },
    idle: (state) => {
      state.value = dayActivity.idle;
    },
    inactivity: (state) => {
      state.value = dayActivity.inactivity;
    }
  },
});

export const { pause, end, breakTime, resume, working, start, idle, inactivity } = activityStore.actions;

export default activityStore.reducer;
