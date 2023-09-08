import React, { RefObject } from "react";
import TaskListUI from "../TaskListUI/TaskListUI";
import { useTaskManager } from "@/hooks/useTaskManager";

interface TaskListFeatureProps {
   tasksRef: RefObject<HTMLDialogElement>;
   expanded: boolean;
}

function TaskListFeature({ tasksRef, expanded }: TaskListFeatureProps) {
   const { tasks, addTask, updateTaskCompletion, removeTask, updateTaskElapsedTime } =
      useTaskManager();

   const completedTasks = tasks?.filter((task) => task.completed);
   const incompleteTasks = tasks?.filter((task) => !task.completed);

   return (
      <dialog
         ref={tasksRef}
         className={`w-full lg:w-1/4  ml-0 bg-transparent pb-6 pt-16 px-4 focus:outline-none overflow-hidden transition-taskContainer duration-500 ease-in-out ${
            expanded ? "h-full opacity-100" : "h-0 opacity-0"
         }`}
      >
         <TaskListUI
            incompleteTasks={incompleteTasks}
            completedTasks={completedTasks}
            addTask={addTask}
            updateTaskCompletion={updateTaskCompletion}
            removeTask={removeTask}
            updateTaskElapsedTime={updateTaskElapsedTime}
         />
      </dialog>
   );
}

export default TaskListFeature;
