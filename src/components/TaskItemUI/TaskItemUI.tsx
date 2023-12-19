import { Task, UserTask } from "@/types/types";
import { formatTime } from "@/utils/utils";
import React from "react";
import { MdRemoveCircleOutline, MdOutlineTimer, MdOutlineTimerOff } from "react-icons/md";

// TODO: add delete option to completed tasks

interface TaskItemUIProps {
   task: Task | UserTask;
   handleTaskCompletion: (taskId: string) => Promise<void>;
   handleTaskDelete: (taskId: string) => Promise<void>;
   toggleTimer: (timerState: "run" | "stop" | "pause") => void;
   timerRunning: boolean;
   elapsedTime: number;
}

function TaskItemUI({
   task,
   handleTaskCompletion,
   handleTaskDelete,
   timerRunning,
   toggleTimer,
   elapsedTime,
}: TaskItemUIProps) {
   return (
      <div className='group my-2 flex items-center justify-between lg:my-1'>
         <div className='flex items-start gap-2'>
            <input
               type='checkbox'
               name='task'
               id={task._id}
               checked={task.completed}
               className='mt-[.3rem] cursor-pointer'
               onChange={() => handleTaskCompletion(task._id)}
            />
            <label htmlFor={task._id} className='cursor-pointer'>
               {task.task}
            </label>
         </div>
         <div className='relative flex items-center gap-2'>
            {elapsedTime > 0 && (
               <div className='flex items-center'>
                  <p>{formatTime(elapsedTime)}</p>
               </div>
            )}

            <div className='flex justify-center gap-2 rounded-lg transition-width duration-300 ease-in-out lg:absolute lg:right-0 lg:w-0 lg:bg-white lg:group-hover:w-12 lg:group-hover:shadow-[0_0_2px_3px_rgba(256,256,256,0.9)]'>
               {/*  <div className='absolute right-0 rounded-lg bg-white shadow-[0_0_5px_6px_rgba(256,256,256,0.9)] w-[5.5rem] lg:w-12 flex gap-2 transition-width duration-300 ease-in-out'> */}

               {!task.completed && (
                  <>
                     {timerRunning ? (
                        <MdOutlineTimerOff
                           onClick={() => toggleTimer("stop")}
                           className='h-10 w-10 cursor-pointer lg:h-5 lg:w-5'
                        />
                     ) : (
                        <MdOutlineTimer
                           onClick={() => toggleTimer("run")}
                           className='h-10 w-10 cursor-pointer lg:h-5 lg:w-5'
                        />
                     )}
                  </>
               )}
               <MdRemoveCircleOutline
                  onClick={() => handleTaskDelete(task._id)}
                  className='h-10 w-10 cursor-pointer lg:h-5 lg:w-5'
               />
            </div>
         </div>
      </div>
   );
}

export default TaskItemUI;
