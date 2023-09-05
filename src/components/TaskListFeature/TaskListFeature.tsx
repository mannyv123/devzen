import { deleteTask, getTasks, updateTaskStatus } from "@/utils/api";
import { Task } from "@/utils/types";
import React, { RefObject, useEffect, useState } from "react";
import TaskItem from "../TaskItem/TaskItem";
import AddTaskFeature from "../AddTaskFeature/AddTaskFeature";

interface TaskListFeatureProps {
   tasksRef: RefObject<HTMLDialogElement>;
   expanded: boolean;
}

function TaskListFeature({ tasksRef, expanded }: TaskListFeatureProps) {
   const [taskData, setTaskData] = useState<Task[]>([]);

   const completedTasks = taskData?.filter((task) => task.completed);
   const uncompletedTasks = taskData?.filter((task) => !task.completed);

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
         <div className='h-full w-full bg-white rounded-lg bg-opacity-90 overflow-y-auto'>
            <div className='flex flex-col gap-4 p-4'>
               <section>
                  <AddTaskFeature getAllTasks={getAllTasks} />
               </section>
               <section>
                  {uncompletedTasks.length > 0 ? (
                     <ul>
                        {uncompletedTasks?.map((task) => (
                           <li key={task._id} className='border-b-2 last:border-none'>
                              <TaskItem
                                 task={task}
                                 handleTaskCompletion={handleTaskCompletion}
                                 handleTaskDelete={handleTaskDelete}
                              />
                           </li>
                        ))}
                     </ul>
                  ) : (
                     <div>
                        <p className='text-slate-500'>No tasks yet...</p>
                     </div>
                  )}
               </section>

               <section className='text-slate-500'>
                  {completedTasks.length > 0 ? (
                     <>
                        <h3>Completed</h3>
                        <ul>
                           {completedTasks?.map((task) => (
                              <li key={task._id} className='border-b-2 last:border-none'>
                                 <TaskItem
                                    task={task}
                                    handleTaskCompletion={handleTaskCompletion}
                                    handleTaskDelete={handleTaskDelete}
                                 />
                              </li>
                           ))}
                        </ul>
                     </>
                  ) : (
                     ""
                  )}
               </section>
            </div>
         </div>
      </dialog>
   );
}

export default TaskListFeature;
