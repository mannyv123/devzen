import { createTask, deleteTask, getTasks, updateElapsedTime, updateTaskStatus } from "@/utils/api";
import { Task } from "@/utils/types";
import { useEffect, useState } from "react";

const fetchTasks = async () => {
   try {
      const result = await getTasks();
      return result;
   } catch (error) {
      console.error("Error fetching tasks: ", error);
   }
};

export function useTaskManager() {
   const [tasks, setTasks] = useState<Task[]>([]);

   //Update tasks data on mount
   useEffect(() => {
      const getTasksData = async () => {
         const tasksData = await fetchTasks(); //Pass the setTasks function as a callback
         setTasks(tasksData);
      };

      void getTasksData();
   }, []);

   //Add new task
   const addTask = async (newTask: string) => {
      try {
         //optimistic update
         const newTaskObj: Task = {
            _id: Math.random().toString(),
            task: newTask,
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            elapsedTime: 0,
         };

         const updatedTasks = [newTaskObj, ...tasks];
         setTasks(updatedTasks);

         //API request to create task
         await createTask(newTask);

         //Refresh tasks data
         const result = await fetchTasks();
         setTasks(result);
      } catch (error) {
         console.error("Error adding task: ", error);
      }
   };

   //Update task completion status
   const updateTaskCompletion = async (taskId: string, elapsedTime: number) => {
      try {
         //optimistic update
         const previousTasks = [...tasks];
         const updatedTasks = previousTasks.map((task) =>
            taskId === task._id
               ? { ...task, completed: !task.completed, elapsedTime: elapsedTime }
               : task,
         );
         setTasks(updatedTasks);

         //API request to create task
         await updateTaskStatus(taskId);

         //Refresh tasks data
         const result = await fetchTasks();
         setTasks(result);
      } catch (error) {
         console.error("Error updating task: ", error);
      }
   };

   //Delete a task
   const removeTask = async (taskId: string) => {
      try {
         //optimistic update
         const previousTasks = [...tasks];
         const updatedTasks = previousTasks.filter((task) => task._id !== taskId);
         setTasks(updatedTasks);

         //API request to create task
         await deleteTask(taskId);

         //Refresh tasks data
         const result = await fetchTasks();
         setTasks(result);
      } catch (error) {
         console.error("Error deleting task: ", error);
      }
   };

   //Update elapsed time for a task
   const updateTaskElapsedTime = async (taskId: string, elapsedTime: number) => {
      try {
         await updateElapsedTime(taskId, elapsedTime);
         //Refresh tasks data
         const result = await fetchTasks();
         setTasks(result);
      } catch (error) {
         console.error("Error updating task elapsed time: ", error);
      }
   };

   return { tasks, addTask, updateTaskCompletion, removeTask, updateTaskElapsedTime };
}
