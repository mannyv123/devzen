import { deleteTask, getTasks, updateTaskStatus } from "@/utils/api";
import { Task } from "@/utils/types";
import React, { RefObject, useEffect, useState } from "react";
import TaskListUI from "../TaskListUI/TaskListUI";

interface TaskListFeatureProps {
   tasksRef: RefObject<HTMLDialogElement>;
   expanded: boolean;
}

function TaskListFeature({ tasksRef, expanded }: TaskListFeatureProps) {
   const [taskData, setTaskData] = useState<Task[]>([]);

   const completedTasks = taskData?.filter((task) => task.completed);
   const incompleteTasks = taskData?.filter((task) => !task.completed);

   // handle getting tasks
   const getAllTasks = async () => {
      const result = await getTasks();
      setTaskData(result);
   };

   // Get tasks on load
   useEffect(() => {
      getAllTasks();
   }, []);

   //handle task deletion
   const handleTaskDelete = async (taskId: string) => {
      try {
         await deleteTask(taskId);
         await getAllTasks();
      } catch (err) {
         console.error(err);
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
            getAllTasks={getAllTasks}
            handleTaskCompletion={handleTaskCompletion}
            handleTaskDelete={handleTaskDelete}
         />
      </dialog>
   );
}

export default TaskListFeature;