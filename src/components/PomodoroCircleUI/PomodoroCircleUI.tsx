import { getPomodoroDetails } from "@/redux/features/timerSlice";
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

//TEMP
const WORK_MINUTES = 25;
const BREAK_MINUTES = 5;

type Modes = "work" | "break";

interface PomodoroCircleUIProps {
   handleSettingsModal: () => void;
}

function PomodoroCircleUI({ handleSettingsModal }: PomodoroCircleUIProps) {
   const [isPaused, setIsPaused] = useState(true);
   const [mode, setMode] = useState<Modes>("work");
   const [secondsLeft, setSecondsLeft] = useState(WORK_MINUTES * 60);

   const timer = useAppSelector(getPomodoroDetails);

   const secondsLeftRef = useRef(secondsLeft);
   const isPausedRef = useRef(isPaused);
   const modeRef = useRef(mode);

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
         const nextSeconds = (nextMode === "work" ? WORK_MINUTES : BREAK_MINUTES) * 60;

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

   const totalSeconds = mode === "work" ? WORK_MINUTES * 60 : BREAK_MINUTES * 60;
   const percentage = Math.round((secondsLeft / totalSeconds) * 100);
   const minutes = Math.floor(secondsLeft / 60);
   const seconds = secondsLeft % 60;
   // let secondsDigit = "";
   // if (seconds < 10) secondsDigit = "0";

   console.log("tick");
   return (
      <div className='absolute h-[28rem] w-[28rem]'>
         <CircularProgressbar
            value={percentage}
            styles={buildStyles({
               textColor: "#fff",
               pathColor: "#f54e4e",
               trailColor: "rgba(255,255,255,.2)",
            })}
         />
         <div className='flex justify-center'>
            {isPaused ? (
               <button
                  className='bg-white'
                  type='button'
                  onClick={() => {
                     setIsPaused(false);
                     isPausedRef.current = false;
                  }}
               >
                  Play
               </button>
            ) : (
               <button
                  className='bg-white'
                  type='button'
                  onClick={() => {
                     setIsPaused(true);
                     isPausedRef.current = true;
                  }}
               >
                  Pause
               </button>
            )}
            <button className='bg-white' type='button' onClick={handleSettingsModal}>
               Settings
            </button>
            {`${minutes}:${seconds}`}
         </div>
      </div>
   );
}

export default PomodoroCircleUI;
