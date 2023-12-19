import { getTimerSettings } from "@/redux/features/timerSettingsSlice";
import { getPomodoroDetails } from "@/redux/features/timerSlice";
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect } from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { RiFocus2Line } from "react-icons/ri";
import { FiCoffee } from "react-icons/fi";
import usePomodoroTimer from "@/hooks/usePomodoroTimer";

const WORK_COLOR = "#FF3338aa";
const BREAK_COLOR = "#06B235aa";

function PomodoroCircleUI() {
   const timer = useAppSelector(getPomodoroDetails);
   const { timerStatus } = timer.timer;
   const timerSettings = useAppSelector(getTimerSettings);
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
      <div className='absolute animate-fadeIn'>
         <div className='h-[27rem] w-[27rem]'>
            <CircularProgressbarWithChildren
               value={percentage}
               styles={buildStyles({
                  textColor: "#fff",
                  pathColor,
                  trailColor: "rgba(255,255,255,.2)",
               })}
               strokeWidth={4}
            >
               <div className='mb-44 flex w-full flex-col items-center justify-evenly text-white lg:mb-10 lg:flex-row'>
                  <div className='text-4xl'>
                     <div className='flex items-center gap-2'>
                        {mode === "work" ? (
                           <>
                              <RiFocus2Line className='animate-fadeIn' />
                              <p>Focus</p>
                           </>
                        ) : (
                           <>
                              <FiCoffee className='animate-fadeIn' />
                              <p>Break</p>
                           </>
                        )}
                     </div>
                  </div>
                  <div className='text-6xl'>{`${minutes}:${secondsDigit}${seconds}`}</div>
               </div>
            </CircularProgressbarWithChildren>
         </div>
      </div>
   );
}

export default PomodoroCircleUI;
