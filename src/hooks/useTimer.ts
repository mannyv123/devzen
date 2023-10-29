import { Task, UserTask } from "@/types/types";
import { useEffect, useState } from "react";

interface TimerProps {
   task: Task | UserTask;
   handleElapsedTimeUpdate: (taskDetails: { taskId: string; elapsedTime: number }) => Promise<void>;
}

function useTimer({ task, handleElapsedTimeUpdate }: TimerProps) {
   const [isTimerRunning, setIsTimerRunning] = useState(false);
   const [elapsedTime, setElapsedTime] = useState(task.elapsedTime);

   //Check if local storage has timer; if it does and it's running, update elapsed time
   useEffect(() => {
      const savedTimerJSON = localStorage.getItem(`timer_${task._id}`);
      const savedTimerLocal = savedTimerJSON
         ? JSON.parse(savedTimerJSON)
         : { running: false, startTime: 0, elapsedTime: task.elapsedTime };

      if (savedTimerLocal.running && task.elapsedTime <= savedTimerLocal.elapsedTime) {
         setIsTimerRunning(true);
         const currentTime = new Date().getTime();
         const elapsedTimeTotal =
            Math.floor((currentTime - savedTimerLocal.startTime) / 1000) +
            savedTimerLocal.elapsedTime;
         setElapsedTime(elapsedTimeTotal);
      }
   }, [task]);

   //Start timer when timer state changes
   useEffect(() => {
      let interval: NodeJS.Timeout;
      if (isTimerRunning) {
         //Start interval to render per second updated elapsed time
         interval = setInterval(() => {
            setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
         }, 1000);
      }
      return () => clearInterval(interval);
   }, [isTimerRunning]);

   //Toggle timer on/off
   const toggleTimer = async () => {
      if (isTimerRunning) {
         setIsTimerRunning(false);

         //Update elapsed time state and DB
         const taskDetails = {
            taskId: task._id,
            elapsedTime: elapsedTime,
         };

         await handleElapsedTimeUpdate(taskDetails);

         //Remove timer from local storage
         localStorage.removeItem(`timer_${task._id}`);
      } else {
         setIsTimerRunning(true);

         //set up timer in local storage
         const startTime = new Date().getTime();
         localStorage.setItem(
            `timer_${task._id}`,
            JSON.stringify({
               running: true,
               startTime,
               elapsedTime: task.elapsedTime,
            }),
         );
      }
   };

   return { toggleTimer, elapsedTime, isTimerRunning };
}

export default useTimer;
