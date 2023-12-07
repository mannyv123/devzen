import React, { ChangeEvent, useEffect, useRef, useState } from "react";

const initialTimeValues = {
   workMin: 25,
   breakMin: 5,
};

interface PomodoroSettingsFeatureProps {
   showSettings: boolean;
   handleSettingsModal: () => void;
}

function PomodoroSettingsFeature({
   showSettings,
   handleSettingsModal,
}: PomodoroSettingsFeatureProps) {
   const [timeValues, setTimeValues] = useState(initialTimeValues);

   const settingsRef = useRef<HTMLDialogElement>(null);

   const handleTimeValues = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setTimeValues({ ...timeValues, [name]: value });
   };

   useEffect(() => {
      if (showSettings === false) {
         settingsRef.current?.close();
      } else if (showSettings === true) {
         settingsRef.current?.showModal();
      }
   }, [showSettings]);

   return (
      <dialog
         ref={settingsRef}
         onKeyDown={(e) => {
            if (e.key === "Escape") {
               handleSettingsModal();
            }
         }}
      >
         <div className='flex h-80 w-96 flex-col bg-slate-500 p-4'>
            <h2>Settings</h2>
            <div className='flex flex-col'>
               <label htmlFor='workMin'>Work Minutes</label>
               <p>{timeValues.workMin}</p>
               <input
                  type='range'
                  name='workMin'
                  id='workMin'
                  min={1}
                  max={120}
                  onChange={handleTimeValues}
                  value={timeValues.workMin}
               />
               <label htmlFor='breakMin'>Break Minutes</label>
               <p>{timeValues.breakMin}</p>
               <input
                  type='range'
                  name='breakMin'
                  id='breakMin'
                  min={1}
                  max={120}
                  onChange={handleTimeValues}
                  value={timeValues.breakMin}
               />
            </div>
         </div>
      </dialog>
   );
}

export default PomodoroSettingsFeature;
