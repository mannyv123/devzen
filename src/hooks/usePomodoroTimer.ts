import { useEffect, useState } from "react";

type Modes = "work" | "break";

interface TimerOptions {
   workTime: number;
   breakTime: number;
   initialMode?: Modes;
}

const usePomodoroTimer = ({ workTime, breakTime, initialMode = "work" }: TimerOptions) => {
   const [isPaused, setIsPaused] = useState(true);
   const [mode, setMode] = useState<Modes>(initialMode);

   const [secondsLeft, setSecondsLeft] = useState(workTime);

   const togglePause = (timerStatus: "running" | "stopped" | "paused") => {
      if (timerStatus === "running") {
         setIsPaused(false);
      } else if (timerStatus === "stopped" || timerStatus === "paused") {
         setIsPaused(true);
      }
   };

   useEffect(() => {
      if (mode === "work") setSecondsLeft(workTime);
   }, [workTime]);

   useEffect(() => {
      if (mode === "break") setSecondsLeft(breakTime);
   }, [breakTime]);

   useEffect(() => {
      const switchMode = () => {
         setMode((prevMode) => (prevMode === "work" ? "break" : "work"));
         setSecondsLeft(mode === "work" ? breakTime : workTime); //setSecondsLeft gets executed before setMode is complete; therefore, times have been switched
      };

      // eslint-disable-next-line prefer-const
      let interval: NodeJS.Timer;
      const manageTimer = () => {
         if (isPaused) {
            clearInterval(interval);
            return;
         } else if (secondsLeft === 0) {
            return switchMode();
         } else {
            setSecondsLeft((prevSeconds) => {
               return prevSeconds - 1;
            });
         }
      };

      interval = setInterval(() => {
         manageTimer();
      }, 1000);

      return () => clearInterval(interval);
   }, [isPaused, secondsLeft]);

   return {
      mode,
      isPaused,
      secondsLeft,
      togglePause,
   };
};

export default usePomodoroTimer;
