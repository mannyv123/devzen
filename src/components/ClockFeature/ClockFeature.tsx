"use client";

import React, { useEffect, useState } from "react";
import ClockUI from "../ClockUI/ClockUI";

const CLOCK_UPDATE_INTERVAL = 60000; //60000 ms = 1 min

const ClockFeature = () => {
   const [currentTime, setCurrentTime] = useState(getTime());

   //Function to get the current time in "hh:mm" format
   function getTime() {
      return new Date()
         .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
         .slice(0, -3); //remove AM/PM
   }

   //Update the current time state every minute using setInterval
   useEffect(() => {
      const intervalId = setInterval(() => {
         setCurrentTime(getTime());
      }, CLOCK_UPDATE_INTERVAL);

      //Clean up the interval when the component unmounts to avoid memory leaks
      return () => clearInterval(intervalId);
   }, []);

   return (
      <>
         <ClockUI currentTime={currentTime} />
      </>
   );
};

export default ClockFeature;
