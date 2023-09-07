import { deleteTask, updateElapsedTime, updateTaskStatus } from "@/utils/api";
import { Task } from "@/utils/types";
import React, { useEffect, useState } from "react";
import TaskItemUI from "../TaskItemUI/TaskItemUI";

interface TaskItemFeatureProps {
   task: Task;
   getAllTasks: () => Promise<void>;
}

const TaskItemFeature = ({ task, getAllTasks }: TaskItemFeatureProps) => {
   const [timerRunning, setTimerRunning] = useState<boolean>(false);
   const [elapsedTime, setElapsedTime] = useState<number>(0);

   // Load saved timer from local storage
   useEffect(() => {
      const savedTimerJSON = localStorage.getItem(`timer_${task._id}`);
      const savedTimerLocal = savedTimerJSON
         ? JSON.parse(savedTimerJSON)
         : { running: false, startTime: 0, elapsedTime: task.elapsedTime };
      if (savedTimerLocal && savedTimerLocal.running) {
         setTimerRunning(true);
         const currentTime = new Date().getTime();
         const elapsedTimeTotal =
            Math.floor((currentTime - savedTimerLocal.startTime) / 1000) +
            savedTimerLocal.elapsedTime;
         setElapsedTime(elapsedTimeTotal);
      } else {
         setElapsedTime(task.elapsedTime);
      }
   }, [task]);

   //Start timer when timer state changes
   useEffect(() => {
      let interval: NodeJS.Timeout;
      if (timerRunning) {
         //Start interval to render per second updated elapsed time
         interval = setInterval(() => {
            setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
         }, 1000);
      }
      return () => clearInterval(interval);
   }, [timerRunning]);

   //Toggle timer start and stop; Update local storage
   const toggleTimer = async () => {
      setTimerRunning((prevTimerRunning) => !prevTimerRunning); //starts or stops the timer
      if (!timerRunning) {
         //Runs after timer is started
         //Record start time in local storage
         const startTime = new Date().getTime();
         localStorage.setItem(
            `timer_${task._id}`,
            JSON.stringify({
               running: true,
               startTime,
               elapsedTime: task.elapsedTime,
            }),
         );
      } else {
         //Runs after timer is stopped
         //Post end time to db
         await updateElapsedTime(task._id, elapsedTime);
         //Remove timer from local storage
         localStorage.removeItem(`timer_${task._id}`);
      }
   };

   //handle task completion change
   const handleTaskCompletion = async (taskId: string) => {
      try {
         await updateTaskStatus(taskId);
         await getAllTasks();
      } catch (err) {
         console.error(err);
      }
   };

   //handle task deletion
   const handleTaskDelete = async (taskId: string) => {
      try {
         await deleteTask(taskId);
         await getAllTasks();
      } catch (err) {
         console.error(err);
      }
   };

   return (
      <>
         <TaskItemUI
            task={task}
            handleTaskCompletion={handleTaskCompletion}
            handleTaskDelete={handleTaskDelete}
            toggleTimer={toggleTimer}
            timerRunning={timerRunning}
            elapsedTime={elapsedTime}
         />
      </>
   );
};

export default TaskItemFeature;
