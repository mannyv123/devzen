import React from "react";
import AddTaskFeature from "../AddTaskFeature/AddTaskFeature";
import { Task } from "@/utils/types";
import TaskItem from "../TaskItem/TaskItem";

interface TaskListUIProps {
   incompleteTasks: Task[];
   completedTasks: Task[];
   getAllTasks: () => Promise<void>;
   handleTaskCompletion: (taskId: string) => Promise<void>;
   handleTaskDelete: (taskId: string) => Promise<void>;
}

function TaskListUI({
   incompleteTasks,
   completedTasks,
   getAllTasks,
   handleTaskCompletion,
   handleTaskDelete,
}: TaskListUIProps) {
   return (
      <div className='h-full w-full bg-white rounded-lg bg-opacity-90 overflow-y-auto'>
         <div className='flex flex-col gap-4 p-4'>
            <section>
               <AddTaskFeature getAllTasks={getAllTasks} />
            </section>
            <section>
               {incompleteTasks.length > 0 ? (
                  <ul>
                     {incompleteTasks?.map((task) => (
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
   );
}

export default TaskListUI;
