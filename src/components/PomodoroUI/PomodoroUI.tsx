import React from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { RiFocus2Line } from "react-icons/ri";
import { FiCoffee } from "react-icons/fi";

interface PomodoroUIProps {
   remainingPercent: number;
   remainingMinutes: number;
   remainingSeconds: number;
   secondsDigit: string;
   pathColor: string;
   mode: "work" | "break";
}

function PomodoroUI({
   remainingMinutes,
   remainingPercent,
   remainingSeconds,
   secondsDigit,
   pathColor,
   mode,
}: PomodoroUIProps) {
   return (
      <div className='absolute animate-fadeIn'>
         <div className='h-[26rem] w-[26rem]'>
            <CircularProgressbarWithChildren
               value={remainingPercent}
               styles={buildStyles({
                  textColor: "#fff",
                  pathColor,
                  trailColor: "rgba(255,255,255,.2)",
               })}
               strokeWidth={4}
            >
               <div className='mb-44 flex w-full flex-col items-center justify-evenly text-white lg:mb-10 lg:flex-row'>
                  <div className='text-4xl'>
                     <div className='flex items-center gap-2'>
                        {mode === "work" ? (
                           <>
                              <RiFocus2Line className='animate-fadeIn' />
                              <p>Focus</p>
                           </>
                        ) : (
                           <>
                              <FiCoffee className='animate-fadeIn' />
                              <p>Break</p>
                           </>
                        )}
                     </div>
                  </div>
                  <div className='text-6xl'>{`${remainingMinutes}:${secondsDigit}${remainingSeconds}`}</div>
               </div>
            </CircularProgressbarWithChildren>
         </div>
      </div>
   );
}

export default PomodoroUI;
