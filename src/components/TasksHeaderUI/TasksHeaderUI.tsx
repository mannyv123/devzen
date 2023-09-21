import React from "react";
import { MdTaskAlt } from "react-icons/md";

interface TasksHeaderUIProps {
   expanded: boolean;
   handleTaskOpenToggle: () => void;
}

function TasksHeaderUI({ expanded, handleTaskOpenToggle }: TasksHeaderUIProps) {
   return (
      <div
         className={`relative w-fit flex justify-center items-center ml-4 mt-3 cursor-pointer text-white border rounded-full pr-2 lg:pr-0 hover:pr-2 hover:opacity-100 group ${
            expanded ? "lg:pr-2 lg:opacity-100" : "lg:pr-0 lg:opacity-40"
         }`}
         onClick={handleTaskOpenToggle}
      >
         <div className='w-10 h-10 p-2'>
            <MdTaskAlt size={"1.5rem"} />
         </div>
         <p
            className={`whitespace-nowrap overflow-hidden transition-width duration-300 text-center flex-1 group-hover:w-[2.625rem] group-hover:h-fit ${
               expanded ? "lg:w-[2.625rem] h-fit" : "lg:w-0 lg:h-0"
            }`}
         >
            Tasks
         </p>
      </div>
   );
}

export default TasksHeaderUI;
