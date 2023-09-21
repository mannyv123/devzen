import React from "react";
import AddTaskFeature from "../AddTaskFeature/AddTaskFeature";
import { Task } from "@/utils/types";
import TaskItemFeature from "../TaskItemFeature/TaskItemFeature";

interface TaskListUIProps {
   incompleteTasks: Task[];
   completedTasks: Task[];
   addTask: (newTask: string) => Promise<void>;
   updateTaskCompletion: (taskId: string) => Promise<void>;
   removeTask: (taskId: string) => Promise<void>;
   updateTaskElapsedTime: (taskId: string, elapsedTime: number) => Promise<void>;
}

function TaskListUI({
   incompleteTasks,
   completedTasks,
   addTask,
   updateTaskCompletion,
   removeTask,
   updateTaskElapsedTime,
}: TaskListUIProps) {
   return (
      <div className='h-full w-full bg-white rounded-lg bg-opacity-90 overflow-y-auto'>
         <div className='flex flex-col gap-4 p-4'>
            <section>
               <AddTaskFeature addTask={addTask} />
            </section>
            <section>
               {incompleteTasks.length > 0 ? (
                  <ul>
                     {incompleteTasks?.map((task) => (
                        <li key={task._id} className='border-b-2 last:border-none'>
                           <TaskItemFeature
                              task={task}
                              status='incomplete'
                              updateTaskCompletion={updateTaskCompletion}
                              removeTask={removeTask}
                              updateTaskElapsedTime={updateTaskElapsedTime}
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
                              <TaskItemFeature
                                 task={task}
                                 status='complete'
                                 updateTaskCompletion={updateTaskCompletion}
                                 removeTask={removeTask}
                              />
                           </li>
                        ))}
                     </ul>
                  </>
               ) : null}
            </section>
         </div>
      </div>
   );
}

export default TaskListUI;
