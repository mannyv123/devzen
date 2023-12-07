import { PomodoroTimer } from "@/types/types";
import { SerializedError, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface TimerState {
   data: PomodoroTimer;
   error: SerializedError | null;
}

const initialState: TimerState = {
   data: { timer: { timerStatus: "stopped" } },
   error: null,
};

//timerSlice
const timerSlice = createSlice({
   name: "timer",
   initialState,
   reducers: {
      startPomodoroTimer(state, action) {
         const { taskId, workTime, breakTime } = action.payload;
         const newTimer: PomodoroTimer = {
            timer: { timerStatus: "running", taskId, workTime, breakTime },
         };
         state.data = newTimer;
      },
      pausePomodoroTimer(state) {
         state.data.timer.timerStatus = "paused";
      },
      stopPomodoroTimer(state) {
         state.data.timer = { timerStatus: "stopped" };
      },
   },
});

export const { startPomodoroTimer, pausePomodoroTimer, stopPomodoroTimer } = timerSlice.actions;

export default timerSlice.reducer;

//Selectors
export const getPomodoroDetails = (state: RootState) => state.timer.data;
