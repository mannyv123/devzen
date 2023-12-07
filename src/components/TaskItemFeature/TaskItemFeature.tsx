import { Task, UserTask } from "@/types/types";
import React from "react";
import TaskItemUI from "../TaskItemUI/TaskItemUI";
import useTimer from "@/hooks/useTimer";
import { useAppDispatch } from "@/redux/hooks";
import { removeTask, updateStatus } from "@/redux/features/tasksSlice";
import { useSession } from "next-auth/react";
import { deleteGuestTask, updateGuestTaskStatus } from "@/redux/features/guestTasksSlice";
import {
   pausePomodoroTimer,
   startPomodoroTimer,
   stopPomodoroTimer,
} from "@/redux/features/timerSlice";

interface TaskItemFeatureProps {
   task: Task | UserTask;
}

const TaskItemFeature = ({ task }: TaskItemFeatureProps) => {
   const dispatch = useAppDispatch();
   const { data: session } = useSession();

   const { toggleTimer, elapsedTime, isTimerRunning } = useTimer({ task });

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

   const handleTimerToggle = (timerState: "run" | "stop" | "pause") => {
      toggleTimer();
      console.log(timerState);
      if (timerState === "run") {
         dispatch(startPomodoroTimer({ taskId: task._id, workTime: 25, breakTime: 5 }));
      } else if (timerState === "pause") {
         dispatch(pausePomodoroTimer({}));
      } else if (timerState === "stop") {
         dispatch(stopPomodoroTimer({}));
      }
   };

   return (
      <TaskItemUI
         task={task}
         handleTaskCompletion={handleTaskCompletion}
         handleTaskDelete={handleTaskDelete}
         toggleTimer={handleTimerToggle}
         timerRunning={isTimerRunning}
         elapsedTime={elapsedTime}
      />
   );
};

export default TaskItemFeature;
