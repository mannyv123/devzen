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
      <div className='z-20 flex flex-col gap-2 text-white md:gap-4 lg:flex-row'>
         <div
            className='group flex cursor-pointer items-center rounded-full border border-white pr-2 hover:pr-2 hover:opacity-100 lg:pr-0 lg:opacity-40'
            onClick={() => handleModal("complexity")}
         >
            <div className='p-2'>
               <div className='relative h-8 w-8'>
                  <Image
                     src={timeComplexityIcon}
                     fill={true}
                     alt='time complexity'
                     className='object-center'
                  />
               </div>
            </div>
            <p className='w-[7.5rem] overflow-hidden whitespace-nowrap text-center transition-width duration-300 group-hover:h-fit group-hover:w-[7.5rem] lg:h-0 lg:w-0'>
               Time Complexity
            </p>
         </div>

         <div
            className='group flex cursor-pointer items-center rounded-full border border-white pr-2 hover:pr-2 hover:opacity-100 lg:pr-0 lg:opacity-40'
            onClick={() => handleModal("bug")}
         >
            <div className='p-2'>
               <div className='relative h-8 w-8'>
                  <Image src={bugIcon} fill={true} alt='find bugs' className='object-center' />
               </div>
            </div>
            <p className='flex-1 overflow-hidden whitespace-nowrap text-center transition-width duration-300 group-hover:h-fit group-hover:w-[4.4375rem] lg:h-0 lg:w-0'>
               Find Bugs
            </p>
         </div>

         <div
            className='group flex cursor-pointer items-center rounded-full border border-white pr-2 hover:pr-2 hover:opacity-100 lg:pr-0 lg:opacity-40'
            onClick={() => handleModal("explain")}
         >
            <div className='p-2'>
               <div className='relative h-8 w-8'>
                  <Image
                     src={explainIcon}
                     fill={true}
                     alt='explain code'
                     className='object-center'
                  />
               </div>
            </div>
            <p className='flex-1 overflow-hidden whitespace-nowrap text-center transition-width duration-300 group-hover:h-fit group-hover:w-[5.8125rem] lg:h-0 lg:w-0'>
               Explain Code
            </p>
         </div>
      </div>
   );
}

export default ChatGptUI;
