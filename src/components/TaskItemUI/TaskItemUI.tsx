import { Task } from "@/utils/types";
import { formatTime } from "@/utils/utils";
import React from "react";
import { MdRemoveCircleOutline, MdOutlineTimer, MdOutlineTimerOff } from "react-icons/md";

// TODO: add delete option to completed tasks

interface TaskItemUIProps {
   task: Task;
   handleTaskCompletion: (taskId: string) => Promise<void>;
   handleTaskDelete: (taskId: string) => Promise<void>;
   toggleTimer: () => void;
   timerRunning: boolean;
   elapsedTime: number;
}

function TaskItemUI({
   task,
   handleTaskCompletion,
   handleTaskDelete,
   toggleTimer,
   timerRunning,
   elapsedTime,
}: TaskItemUIProps) {
   return (
      <div className='flex justify-between items-center group my-2 lg:my-1'>
         <div className='flex items-start gap-2'>
            <input
               type='checkbox'
               name='task'
               id={task._id}
               checked={task.completed}
               className='cursor-pointer mt-[.3rem]'
               onChange={() => handleTaskCompletion(task._id)}
            />
            <label htmlFor={task._id} className='cursor-pointer'>
               {task.task}
            </label>
         </div>
         <div className='relative flex items-center gap-2'>
            {elapsedTime > 0 && (
               <div className='flex items-center p-2'>
                  <p>{formatTime(elapsedTime)}</p>
               </div>
            )}
            {!task.completed && (
               <div className='lg:absolute lg:right-0 rounded-lg lg:bg-green-500 lg:group-hover:shadow-[0_0_2px_3px_rgba(256,256,256,0.9)] lg:w-0 lg:group-hover:w-12 flex gap-2 transition-width duration-300 ease-in-out'>
                  {/*  <div className='absolute right-0 rounded-lg bg-white shadow-[0_0_5px_6px_rgba(256,256,256,0.9)] w-[5.5rem] lg:w-12 flex gap-2 transition-width duration-300 ease-in-out'> */}
                  {timerRunning ? (
                     <MdOutlineTimerOff
                        onClick={toggleTimer}
                        className='cursor-pointer w-10 lg:w-5 h-10 lg:h-5'
                     />
                  ) : (
                     <MdOutlineTimer
                        onClick={toggleTimer}
                        className='cursor-pointer w-10 lg:w-5 h-10 lg:h-5'
                     />
                  )}
                  <MdRemoveCircleOutline
                     onClick={() => handleTaskDelete(task._id)}
                     className='cursor-pointer w-10 lg:w-5 h-10 lg:h-5'
                  />
               </div>
            )}
         </div>
      </div>
   );
}

export default TaskItemUI;
