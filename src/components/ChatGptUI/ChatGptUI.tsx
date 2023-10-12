import React from "react";
import timeComplexityIcon from "public/icons/timecomplexity.svg";
import bugIcon from "public/icons/bug.svg";
import explainIcon from "public/icons/explain.svg";
import Image from "next/image";
import { ModalOption } from "@/types/types";

interface ChatGPTUIProps {
   handleModal: (option: ModalOption) => void;
}

function ChatGptUI({ handleModal }: ChatGPTUIProps) {
   return (
      <div className='flex flex-col lg:flex-row gap-2 md:gap-4 text-white'>
         <div
            className='cursor-pointer flex items-center border border-white rounded-full lg:opacity-40 hover:opacity-100 pr-2 lg:pr-0 hover:pr-2 group'
            onClick={() => handleModal("complexity")}
         >
            <div className='p-2'>
               <div className='relative w-8 h-8'>
                  <Image
                     src={timeComplexityIcon}
                     fill={true}
                     alt='time complexity'
                     className='object-center'
                  />
               </div>
            </div>
            <p className='whitespace-nowrap overflow-hidden transition-width duration-300 text-center w-[7.5rem] lg:w-0 lg:h-0 group-hover:w-[7.5rem] group-hover:h-fit'>
               Time Complexity
            </p>
         </div>

         <div
            className='cursor-pointer flex items-center border border-white rounded-full lg:opacity-40 hover:opacity-100 pr-2 lg:pr-0 hover:pr-2 group'
            onClick={() => handleModal("bug")}
         >
            <div className='p-2'>
               <div className='relative w-8 h-8'>
                  <Image src={bugIcon} fill={true} alt='find bugs' className='object-center' />
               </div>
            </div>
            <p className='whitespace-nowrap overflow-hidden transition-width duration-300 text-center flex-1 lg:w-0 lg:h-0 group-hover:w-[4.4375rem] group-hover:h-fit'>
               Find Bugs
            </p>
         </div>

         <div
            className='cursor-pointer flex items-center border border-white rounded-full lg:opacity-40 hover:opacity-100 pr-2 lg:pr-0 hover:pr-2 group'
            onClick={() => handleModal("explain")}
         >
            <div className='p-2'>
               <div className='relative w-8 h-8'>
                  <Image
                     src={explainIcon}
                     fill={true}
                     alt='explain code'
                     className='object-center'
                  />
               </div>
            </div>
            <p className='whitespace-nowrap overflow-hidden transition-width duration-300 text-center flex-1 lg:w-0 lg:h-0 group-hover:w-[5.8125rem] group-hover:h-fit'>
               Explain Code
            </p>
         </div>
      </div>
   );
}

export default ChatGptUI;
