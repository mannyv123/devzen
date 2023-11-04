import React from "react";

interface ClockUIProps {
   currentTime: string;
}

function ClockUI({ currentTime }: ClockUIProps) {
   return (
      <div suppressHydrationWarning className='text-8xl text-white md:text-9xl'>
         {currentTime}
      </div>
   );
}

export default ClockUI;
