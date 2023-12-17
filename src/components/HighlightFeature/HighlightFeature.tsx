"use client";

import React, { useEffect, useState } from "react";

function HighlightFeature() {
   const [isMouseMoving, setIsMouseMoving] = useState(false);

   useEffect(() => {
      let mouseMoveTimer: NodeJS.Timeout;

      const handleMouseMoveWithDelay = () => {
         setIsMouseMoving(true);
         clearTimeout(mouseMoveTimer);

         mouseMoveTimer = setTimeout(() => {
            setIsMouseMoving(false);
         }, 1000);
      };

      document.addEventListener("mousemove", handleMouseMoveWithDelay);

      return () => {
         document.removeEventListener("mousemove", handleMouseMoveWithDelay);
         clearTimeout(mouseMoveTimer);
      };
   }, []);

   return (
      <div
         className={` h-full w-full shadow-[inset_0px_0px_150px_10px_rgba(0,0,0,0.6)] transition-opacity duration-500 ${
            isMouseMoving ? "opacity-100" : "opacity-0"
         }`}
      ></div>
   );
}

export default HighlightFeature;
