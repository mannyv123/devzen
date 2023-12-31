import React, { RefObject, useEffect } from "react";
import TaskListUI from "../TaskListUI/TaskListUI";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchTasks, selectAllTasks, tasksStatus } from "@/redux/features/tasksSlice";
import { useSession } from "next-auth/react";
import { selectAllGuestTasks } from "@/redux/features/guestTasksSlice";
import { Task, UserTask } from "@/types/types";
import PomodoroSettingsFeature from "../PomodoroSettingsFeature/PomodoroSettingsFeature";

interface TaskListFeatureProps {
   tasksRef: RefObject<HTMLDialogElement>;
   expanded: boolean;
}

function TaskListFeature({ tasksRef, expanded }: TaskListFeatureProps) {
   const { data: session } = useSession();

   const dispatch = useAppDispatch();
   const userTasks = useAppSelector(selectAllTasks);
   const guestTasks = useAppSelector(selectAllGuestTasks);

   const tasksCurrentStatus = useAppSelector(tasksStatus);

   useEffect(() => {
      const getAllTasks = async () => {
         await dispatch(fetchTasks());
      };

      if (tasksCurrentStatus === "idle" && session) {
         getAllTasks();
      }
   }, [tasksCurrentStatus, dispatch, session]);

   const tasks: (UserTask | Task)[] = session ? userTasks : guestTasks;

   const completedTasks = tasks.filter((task: UserTask | Task) => task.completed);
   const incompleteTasks = tasks
      .filter((task: UserTask | Task) => !task.completed)
      .sort(
         (a: UserTask | Task, b: UserTask | Task) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

   return (
      <dialog
         ref={tasksRef}
         className={`ml-0 w-full overflow-hidden bg-transparent px-4 pb-6 pt-16 transition-taskContainer duration-500 ease-in-out focus:outline-none lg:w-1/3 ${
            expanded ? "h-[95%] opacity-100" : "h-0 opacity-0"
         }`}
      >
         <TaskListUI incompleteTasks={incompleteTasks} completedTasks={completedTasks} />
         <PomodoroSettingsFeature />
      </dialog>
   );
}

export default TaskListFeature;
