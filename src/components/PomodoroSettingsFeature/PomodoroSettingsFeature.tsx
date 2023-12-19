import { getTimerSettings, setTimes } from "@/redux/features/timerSettingsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { ChangeEvent, useEffect, useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";

function PomodoroSettingsFeature() {
   const dispatch = useAppDispatch();
   const initialTimerSettings = useAppSelector(getTimerSettings);

   const [timerSettings, setTimerSettings] = useState(initialTimerSettings);
   const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);

   useEffect(() => {
      dispatch(
         setTimes({
            timerEnabled: timerSettings.timerEnabled,
            workTime: timerSettings.workTime,
            breakTime: timerSettings.breakTime,
         }),
      );
   }, [timerSettings]);

   const handleSettingsDrawer = () => {
      setIsSettingsExpanded((prev) => !prev);
   };

   const handleTimerSettings = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name === "enableTimer") {
         setTimerSettings({ ...timerSettings, timerEnabled: !timerSettings.timerEnabled });
      } else {
         setTimerSettings({ ...timerSettings, [name]: value });
      }
   };

   return (
      <div className='relative w-full'>
         <div className='absolute bottom-0 w-full rounded-lg bg-white'>
            <div className='flex h-full w-full flex-col bg-black/10'>
               <div
                  onClick={handleSettingsDrawer}
                  className='flex w-full cursor-pointer justify-center'
               >
                  <MdKeyboardArrowUp
                     size={"1.5rem"}
                     className={`transition-transform duration-700 ${
                        isSettingsExpanded ? "rotate-180" : ""
                     }`}
                  />
               </div>
               <div
                  className={`overflow-hidden transition-height duration-700 ${
                     isSettingsExpanded ? "h-48" : "h-0"
                  }`}
               >
                  <div className='flex flex-col gap-5 p-4'>
                     <h3>Pomodoro Timer Settings</h3>
                     <div className='flex items-center'>
                        <p className='w-1/4'>
                           {timerSettings.timerEnabled ? "Enabled" : "Disabled"}
                        </p>
                        <label className='relative inline-block h-[1.75rem] w-[3.875rem] text-[1.0625rem]'>
                           <input
                              type='checkbox'
                              id='enableTimer'
                              name='enableTimer'
                              checked={timerSettings.timerEnabled}
                              className='peer h-0 w-0 opacity-100'
                              onChange={handleTimerSettings}
                           />
                           <span className='trasit absolute bottom-0 left-0 right-0 top-0 cursor-pointer rounded-[1.875rem] border border-[#ccc]  bg-white duration-500 peer-checked:border-transparent peer-checked:bg-[#5fdd54]'></span>
                           <span className='absolute bottom-0 left-[.075rem] top-0 h-[1.6em] w-[1.6em] cursor-pointer rounded-2xl bg-white shadow-[0_2px_5px_#999999] transition duration-500 peer-checked:translate-x-[1.7em]'></span>
                        </label>
                     </div>

                     <div className='flex items-center'>
                        <label htmlFor='workTime' className='w-1/4'>
                           Focus:
                        </label>
                        <p className='w-1/4'>{timerSettings.workTime} min.</p>
                        <input
                           type='range'
                           name='workTime'
                           id='workTime'
                           min={1}
                           max={120}
                           onChange={handleTimerSettings}
                           value={timerSettings.workTime}
                           className='w-1/2'
                        />
                     </div>

                     <div className='flex items-center'>
                        <label htmlFor='breakTime' className='w-1/4'>
                           Break:
                        </label>
                        <p className='w-1/4'>{timerSettings.breakTime} min.</p>
                        <input
                           type='range'
                           name='breakTime'
                           id='breakTime'
                           min={1}
                           max={120}
                           onChange={handleTimerSettings}
                           value={timerSettings.breakTime}
                           className='w-1/2'
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default PomodoroSettingsFeature;
