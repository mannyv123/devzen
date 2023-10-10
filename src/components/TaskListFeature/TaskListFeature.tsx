import React, { RefObject, useEffect } from "react";
import TaskListUI from "../TaskListUI/TaskListUI";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchTasks, selectAllTasks, tasksStatus } from "@/redux/features/tasksSlice";

interface TaskListFeatureProps {
   tasksRef: RefObject<HTMLDialogElement>;
   expanded: boolean;
}

function TaskListFeature({ tasksRef, expanded }: TaskListFeatureProps) {
   const dispatch = useAppDispatch();
   const tasks = useAppSelector(selectAllTasks);
   const tasksCurrentStatus = useAppSelector(tasksStatus);

   useEffect(() => {
      if (tasksCurrentStatus === "idle") {
         dispatch(fetchTasks());
      }
   }, [tasksCurrentStatus, dispatch]);

   const completedTasks = tasks.filter((task) => task.completed);
   const incompleteTasks = tasks
      .filter((task) => !task.completed)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

   return (
      <dialog
         ref={tasksRef}
         className={`w-full lg:w-1/3 ml-0 bg-transparent pb-6 pt-16 px-4 focus:outline-none overflow-hidden transition-taskContainer duration-500 ease-in-out ${
            expanded ? "h-full opacity-100" : "h-0 opacity-0"
         }`}
      >
         <TaskListUI incompleteTasks={incompleteTasks} completedTasks={completedTasks} />
      </dialog>
   );
}

export default TaskListFeature;
