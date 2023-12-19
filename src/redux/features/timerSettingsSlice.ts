import { SerializedError, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TimerSettings } from "@/types/types";

interface TimerSettingsState {
   data: TimerSettings;
   error: SerializedError | null;
}

const initialState: TimerSettingsState = {
   data: { timerSettings: { timerEnabled: false, workTime: 25, breakTime: 5 } },
   error: null,
};

//timerSettingsSlice
const timerSettingsSlice = createSlice({
   name: "timerSettings",
   initialState,
   reducers: {
      setTimes(state, action) {
         const { timerEnabled, workTime, breakTime } = action.payload;
         state.data.timerSettings = {
            ...state.data.timerSettings,
            workTime,
            breakTime,
            timerEnabled,
         };
      },
   },
});

export const { setTimes } = timerSettingsSlice.actions;

export default timerSettingsSlice.reducer;

//Selectors
export const getTimerSettings = (state: RootState) => state.timerSettings.data.timerSettings;
