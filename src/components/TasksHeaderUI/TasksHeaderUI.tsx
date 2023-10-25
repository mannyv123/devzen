import React from "react";
import { MdTaskAlt } from "react-icons/md";

interface TasksHeaderUIProps {
   expanded: boolean;
   handleTaskOpenToggle: () => void;
}

function TasksHeaderUI({ expanded, handleTaskOpenToggle }: TasksHeaderUIProps) {
   return (
      <div
         className={`group relative ml-4 mt-3 flex w-fit cursor-pointer items-center justify-center rounded-full border pr-2 text-white hover:pr-2 hover:opacity-100 ${
            expanded ? "lg:pr-2 lg:opacity-100" : "lg:pr-0 lg:opacity-40"
         }`}
         onClick={handleTaskOpenToggle}
      >
         <div className='h-10 w-10 p-2'>
            <MdTaskAlt size={"1.5rem"} />
         </div>
         <p
            className={`flex-1 overflow-hidden whitespace-nowrap text-center transition-width duration-300 group-hover:h-fit group-hover:w-[2.625rem] ${
               expanded ? "h-fit lg:w-[2.625rem]" : "lg:h-0 lg:w-0"
            }`}
         >
            Tasks
         </p>
      </div>
   );
}

export default TasksHeaderUI;
