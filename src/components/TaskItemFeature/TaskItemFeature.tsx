import { Task } from "@/utils/types";
import React from "react";
import TaskItemUI from "../TaskItemUI/TaskItemUI";
import useTimer from "@/hooks/useTimer";

interface TaskItemFeatureProps {
   task: Task;
   updateTaskCompletion: (taskId: string, elapsedTime: number) => Promise<void>;
   removeTask: (taskId: string) => Promise<void>;
   updateTaskElapsedTime: (taskId: string, elapsedTime: number) => Promise<void>;
}

const TaskItemFeature = ({
   task,
   updateTaskCompletion,
   removeTask,
   updateTaskElapsedTime,
}: TaskItemFeatureProps) => {
   const { toggleTimer, elapsedTime, isTimerRunning } = useTimer({ task, updateTaskElapsedTime });

   const handleTaskDelete = async (taskId: string) => {
      if (task.completed === false && isTimerRunning === true) {
         await toggleTimer();
      }
      await removeTask(taskId);
   };

   const handleTaskCompletion = async (taskId: string) => {
      if (task.completed === false && isTimerRunning === true) {
         await toggleTimer();
      }
      await updateTaskCompletion(taskId, elapsedTime);
   };

   return (
      <>
         <TaskItemUI
            task={task}
            handleTaskCompletion={handleTaskCompletion}
            handleTaskDelete={handleTaskDelete}
            toggleTimer={toggleTimer}
            timerRunning={isTimerRunning}
            elapsedTime={elapsedTime}
         />
      </>
   );
};

export default TaskItemFeature;
