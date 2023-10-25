import React from "react";
import { MdErrorOutline } from "react-icons/md";

interface ErrorIconProps {
   errorMsg: string;
}

function ErrorIcon({ errorMsg }: ErrorIconProps) {
   return (
      <div className='relative flex w-full cursor-pointer items-center text-red-600'>
         <MdErrorOutline size={"1.25rem"} className='peer' />
         <span className='pointer-events-none absolute left-11 border bg-white px-2 text-sm shadow-lg transition-opacity peer-hover:opacity-100 lg:opacity-0 '>
            {errorMsg}
         </span>
      </div>
   );
}

export default ErrorIcon;
