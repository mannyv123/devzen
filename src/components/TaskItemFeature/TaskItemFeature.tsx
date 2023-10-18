import { Task, UserTask } from "@/types/types";
import React from "react";
import TaskItemUI from "../TaskItemUI/TaskItemUI";
import useTimer from "@/hooks/useTimer";
import { useAppDispatch } from "@/redux/hooks";
import { removeTask, updateStatus, updateTaskElapsedTime } from "@/redux/features/tasksSlice";
import { useSession } from "next-auth/react";
import { deleteGuestTask, updateGuestTaskStatus } from "@/redux/features/guestTasksSlice";

interface TaskItemFeatureProps {
   task: Task | UserTask;
}

const TaskItemFeature = ({ task }: TaskItemFeatureProps) => {
   const dispatch = useAppDispatch();
   const { data: session } = useSession();
   const handleElapsedTimeUpdate = async (taskDetails: { taskId: string; elapsedTime: number }) => {
      await dispatch(updateTaskElapsedTime(taskDetails));
   };

   const { toggleTimer, elapsedTime, isTimerRunning } = useTimer({ task, handleElapsedTimeUpdate });

   const handleTaskDelete = async (taskId: string) => {
      if (task.completed === false && isTimerRunning === true) {
         await toggleTimer();
      }

      if (session) {
         await dispatch(removeTask(taskId));
      } else {
         dispatch(deleteGuestTask({ taskId }));
      }
   };

   const handleTaskCompletion = async (taskId: string) => {
      if (task.completed === false && isTimerRunning === true) {
         await toggleTimer();
      }

      if (session) {
         await dispatch(updateStatus(taskId));
      } else {
         dispatch(updateGuestTaskStatus({ taskId }));
      }
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
