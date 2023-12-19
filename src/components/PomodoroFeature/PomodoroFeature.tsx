"use client";

import React, { useEffect } from "react";
import { getTimerSettings } from "@/redux/features/timerSettingsSlice";
import { getPomodoroDetails } from "@/redux/features/timerSlice";
import { useAppSelector } from "@/redux/hooks";
import PomodoroUI from "../PomodoroUI/PomodoroUI";
import usePomodoroTimer from "@/hooks/usePomodoroTimer";

const WORK_COLOR = "#FF3338aa";
const BREAK_COLOR = "#06B235aa";

function PomodoroFeature() {
   const timerSettings = useAppSelector(getTimerSettings);
   const timer = useAppSelector(getPomodoroDetails);
   const { timerStatus } = timer.timer;
   const { workTime, breakTime } = timerSettings; // in minutes

   const WORK_TIME_SECONDS = workTime * 60;
   const BREAK_TIME_SECONDS = breakTime * 60;

   const { togglePause, secondsLeft, mode } = usePomodoroTimer({
      workTime: WORK_TIME_SECONDS,
      breakTime: BREAK_TIME_SECONDS,
   });

   const pathColor = mode === "work" ? WORK_COLOR : BREAK_COLOR;

   useEffect(() => {
      togglePause(timerStatus);
   }, [timerStatus]);

   const totalSeconds = mode === "work" ? WORK_TIME_SECONDS : BREAK_TIME_SECONDS;
   const percentage = Math.round((secondsLeft / totalSeconds) * 100);
   const minutes = Math.floor(secondsLeft / 60);
   const seconds = secondsLeft % 60;
   let secondsDigit = "";
   if (seconds < 10) secondsDigit = "0";

   return (
      <>
         {timerSettings.timerEnabled ? (
            <PomodoroUI
               remainingMinutes={minutes}
               remainingPercent={percentage}
               remainingSeconds={seconds}
               secondsDigit={secondsDigit}
               pathColor={pathColor}
               mode={mode}
            />
         ) : null}
      </>
   );
}

export default PomodoroFeature;
