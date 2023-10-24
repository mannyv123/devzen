import React from "react";
import { MdErrorOutline } from "react-icons/md";

interface ErrorIconProps {
   errorMsg: string;
}

function ErrorIcon({ errorMsg }: ErrorIconProps) {
   return (
      <div className='text-red-600 relative flex items-center w-full cursor-pointer'>
         <MdErrorOutline size={"1.25rem"} className='peer' />
         <span className='shadow-lg absolute lg:left-11 px-2 bg-white border text-sm pointer-events-none transition-opacity opacity-0 peer-hover:opacity-100'>
            {errorMsg}
         </span>
      </div>
   );
}

export default ErrorIcon;
