import React from "react";
import AddTaskFeature from "../AddTaskFeature/AddTaskFeature";
import { Task, UserTask } from "@/types/types";
import TaskItemFeature from "../TaskItemFeature/TaskItemFeature";

interface TaskListUIProps {
   incompleteTasks: (Task | UserTask)[];
   completedTasks: (Task | UserTask)[];
}

function TaskListUI({ incompleteTasks, completedTasks }: TaskListUIProps) {
   return (
      <div className='h-full w-full overflow-y-auto rounded-lg bg-white bg-opacity-90'>
         <div className='flex flex-col gap-4 p-4'>
            <section>
               <AddTaskFeature />
            </section>
            <section>
               {incompleteTasks.length > 0 ? (
                  <ul>
                     {incompleteTasks?.map((task) => (
                        <li key={task._id} className='border-b-2 last:border-none'>
                           <TaskItemFeature task={task} />
                        </li>
                     ))}
                  </ul>
               ) : (
                  <div>
                     <p className='text-slate-500'>No tasks yet...</p>
                  </div>
               )}
            </section>

            <section className='text-gray-400'>
               {completedTasks.length > 0 ? (
                  <>
                     <h3>Completed</h3>
                     <ul>
                        {completedTasks?.map((task) => (
                           <li key={task._id} className='border-b-2 last:border-none'>
                              <TaskItemFeature task={task} />
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
