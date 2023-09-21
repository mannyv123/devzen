import React from "react";

interface ClockUIProps {
   currentTime: string;
}

function ClockUI({ currentTime }: ClockUIProps) {
   return (
      <div suppressHydrationWarning className='text-6xl md:text-9xl text-white'>
         {currentTime}
      </div>
   );
}

export default ClockUI;
