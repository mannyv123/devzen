"use client";

import { useAppSelector } from "@/redux/hooks";
import PomodoroCircleUI from "../PomodoroCircleUI/PomodoroCircleUI";
import { getTimerSettings } from "@/redux/features/timerSettingsSlice";

function PomodoroFeature() {
   const timerSettings = useAppSelector(getTimerSettings);

   return <>{timerSettings.timerEnabled ? <PomodoroCircleUI /> : null}</>;
}

export default PomodoroFeature;
