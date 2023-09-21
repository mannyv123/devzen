import { Task } from "@/utils/types";
import React, { useEffect, useState } from "react";
import TaskItemUI from "../TaskItemUI/TaskItemUI";

interface CommonTaskProps {
   task: Task;
   updateTaskCompletion: (taskId: string) => Promise<void>;
   removeTask: (taskId: string) => Promise<void>;
}

interface IncompleteTask extends CommonTaskProps {
   status: "incomplete";
   updateTaskElapsedTime: (taskId: string, elapsedTime: number) => Promise<void>;
}

interface CompleteTask extends CommonTaskProps {
   status: "complete";
}

type TaskItemFeatureProps = IncompleteTask | CompleteTask;

const TaskItemFeature = (props: TaskItemFeatureProps) => {
   const { task, updateTaskCompletion, removeTask, status } = props;

   const [timerRunning, setTimerRunning] = useState<boolean>(false);
   const [elapsedTime, setElapsedTime] = useState<number>(0);

   // Load and manage saved timer from local storage for the task item
   useEffect(() => {
      // Load saved timer data when the component mounts
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
         // If the task is incomplete, update the elapsed time in the database
         if (status === "incomplete") {
            await props.updateTaskElapsedTime(task._id, elapsedTime);
         }
         //Remove timer from local storage
         localStorage.removeItem(`timer_${task._id}`);
      }
   };

   return (
      <>
         <TaskItemUI
            task={task}
            handleTaskCompletion={updateTaskCompletion}
            handleTaskDelete={removeTask}
            toggleTimer={toggleTimer}
            timerRunning={timerRunning}
            elapsedTime={elapsedTime}
         />
      </>
   );
};

export default TaskItemFeature;
