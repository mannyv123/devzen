"use client";

import React, {
   ChangeEvent,
   FormEvent,
   useEffect,
   useRef,
   useState,
} from "react";

import TaskItem from "../TaskItem/TaskItem";
import { Task } from "@/utils/types";
import {
   createTask,
   deleteTask,
   getTasks,
   updateTaskStatus,
} from "@/utils/api";
import TasksHeaderUI from "../TasksHeaderUI/TasksHeaderUI";

const TasksFeature = () => {
   const [newTask, setNewTask] = useState<string>("");
   const [expanded, setExpanded] = useState<boolean>(false);
   const [taskData, setTaskData] = useState<Task[]>([]);
   const [isBlank, setIsBlank] = useState<boolean>(false);

   const tasksRef = useRef<HTMLDialogElement>(null);

   const completedTasks = taskData?.filter((task) => task.completed);
   const uncompletedTasks = taskData?.filter((task) => !task.completed);

   //handles expanding and closing the task dialog
   const handleTaskOpenToggle = () => {
      if (tasksRef.current) {
         setExpanded(!expanded);
         if (!expanded) {
            tasksRef.current.show();
         } else {
            setTimeout(() => {
               tasksRef.current?.close();
            }, 700);
         }
      }
   };

   // handle getting tasks
   const getAllTasks = async () => {
      const result = await getTasks();
      setTaskData(result);
   };

   // Get tasks on load
   useEffect(() => {
      getAllTasks();
   }, []);

   //handles input of new task
   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTask(e.target.value);

      if (isBlank) {
         setIsBlank(false);
      }
   };

   //handles new task submission
   const handleNewTaskSubmit = async (e: FormEvent) => {
      e.preventDefault();

      //input validation
      if (newTask === "") {
         return setIsBlank(true);
      }

      await createTask(newTask);
      await getAllTasks();
      setNewTask("");
   };

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
      <>
         <dialog
            ref={tasksRef}
            className={`w-full lg:w-1/4  ml-0 bg-transparent pb-6 pt-16 px-4 focus:outline-none overflow-hidden transition-taskContainer duration-500 ease-in-out ${
               expanded ? "h-full opacity-100" : "h-0 opacity-0"
            }`}
         >
            <div className='h-full w-full bg-white rounded-lg bg-opacity-90 overflow-y-auto'>
               <div className='flex flex-col gap-4 p-4'>
                  <section>
                     <form action='submit' onSubmit={handleNewTaskSubmit}>
                        <input
                           className={`rounded-lg w-full px-2 py-1 focus:outline-none ${
                              isBlank ? "ring-2 ring-red-600" : "focus:ring-2"
                           }`}
                           placeholder='New task ...'
                           type='text'
                           name='newTask'
                           id='newTask'
                           onChange={handleInputChange}
                           value={newTask}
                        />
                     </form>
                  </section>
                  <section>
                     {uncompletedTasks.length > 0 ? (
                        <ul>
                           {uncompletedTasks?.map((task) => (
                              <li
                                 key={task._id}
                                 className='border-b-2 last:border-none'
                              >
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
                                 <li
                                    key={task._id}
                                    className='border-b-2 last:border-none'
                                 >
                                    <TaskItem
                                       task={task}
                                       handleTaskCompletion={
                                          handleTaskCompletion
                                       }
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
         <TasksHeaderUI
            expanded={expanded}
            handleTaskOpenToggle={handleTaskOpenToggle}
         />
      </>
   );
};

export default TasksFeature;
