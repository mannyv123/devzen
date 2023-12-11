import { getTimerSettings } from "@/redux/features/timerSettingsSlice";
import { getPomodoroDetails } from "@/redux/features/timerSlice";
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useRef, useState } from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { RiFocus2Line } from "react-icons/ri";
import { FiCoffee } from "react-icons/fi";

type Modes = "work" | "break";

function PomodoroCircleUI() {
   const [isPaused, setIsPaused] = useState(true);
   const [mode, setMode] = useState<Modes>("work");

   const timer = useAppSelector(getPomodoroDetails);
   const timerSettings = useAppSelector(getTimerSettings);

   const [secondsLeft, setSecondsLeft] = useState(timerSettings.workTime * 60);

   const secondsLeftRef = useRef(secondsLeft);
   const isPausedRef = useRef(isPaused);
   const modeRef = useRef(mode);

   useEffect(() => {
      setSecondsLeft(timerSettings.workTime * 60);
      secondsLeftRef.current = timerSettings.workTime * 60;
   }, [timerSettings.workTime]);

   const tick = () => {
      secondsLeftRef.current--;
      setSecondsLeft(secondsLeftRef.current);
   };

   useEffect(() => {
      const status = timer.timer.timerStatus;
      if (status === "running") {
         setIsPaused(false);
         isPausedRef.current = false;
      } else if (status === "stopped" || status === "paused") {
         setIsPaused(true);
         isPausedRef.current = true;
      }
   }, [timer.timer.timerStatus]);

   useEffect(() => {
      const switchMode = () => {
         const nextMode = modeRef.current === "work" ? "break" : "work";
         const nextSeconds =
            (nextMode === "work" ? timerSettings.workTime : timerSettings.breakTime) * 60;

         setMode(nextMode);
         modeRef.current = nextMode;

         setSecondsLeft(nextSeconds);
         secondsLeftRef.current = nextSeconds;
      };

      const interval = setInterval(() => {
         if (isPausedRef.current) {
            return;
         }
         if (secondsLeftRef.current === 0) {
            return switchMode();
         }
         tick();
      }, 1000);

      return () => clearInterval(interval);
   }, [isPaused]);

   const totalSeconds =
      mode === "work" ? timerSettings.workTime * 60 : timerSettings.breakTime * 60;
   const percentage = Math.round((secondsLeft / totalSeconds) * 100);
   const minutes = Math.floor(secondsLeft / 60);
   const seconds = secondsLeft % 60;
   let secondsDigit = "";
   if (seconds < 10) secondsDigit = "0";

   return (
      <div className='absolute animate-fadeIn'>
         <div className='h-[28rem] w-[28rem]'>
            <CircularProgressbarWithChildren
               value={percentage}
               styles={buildStyles({
                  textColor: "#fff",
                  pathColor: "#f54e4e",
                  trailColor: "rgba(255,255,255,.2)",
               })}
            >
               <div className='mb-10 flex w-full items-center justify-evenly text-white'>
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
