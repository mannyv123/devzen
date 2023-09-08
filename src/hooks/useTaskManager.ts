import { createTask, deleteTask, getTasks, updateElapsedTime, updateTaskStatus } from "@/utils/api";
import { Task } from "@/utils/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const fetchTasks = async (updateFunction: Dispatch<SetStateAction<Task[]>>) => {
   try {
      const result = await getTasks();
      updateFunction(result);
   } catch (error) {
      console.error("Error fetching tasks: ", error);
   }
};

export function useTaskManager() {
   const [tasks, setTasks] = useState<Task[]>([]);

   //Update tasks data on mount
   useEffect(() => {
      void fetchTasks(setTasks); //Pass the setTasks function as a callback
   }, []);

   //Add new task
   const addTask = async (newTask: string) => {
      try {
         await createTask(newTask);
         await fetchTasks(setTasks);
      } catch (error) {
         console.error("Error adding task: ", error);
      }
   };

   //Update task completion status
   const updateTaskCompletion = async (taskId: string) => {
      try {
         await updateTaskStatus(taskId);
         await fetchTasks(setTasks);
      } catch (error) {
         console.error("Error updating task: ", error);
      }
   };

   //Delete a task
   const removeTask = async (taskId: string) => {
      try {
         await deleteTask(taskId);
         await fetchTasks(setTasks);
      } catch (error) {
         console.error("Error deleting task: ", error);
      }
   };

   //Update elapsed time for a task
   const updateTaskElapsedTime = async (taskId: string, elapsedTime: number) => {
      try {
         await updateElapsedTime(taskId, elapsedTime);
         await fetchTasks(setTasks);
      } catch (error) {
         console.error("Error updating task elapsed time: ", error);
      }
   };

   return { tasks, addTask, updateTaskCompletion, removeTask, updateTaskElapsedTime };
}
