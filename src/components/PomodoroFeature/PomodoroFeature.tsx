"use client";

import { useState } from "react";
import PomodoroCircleUI from "../PomodoroCircleUI/PomodoroCircleUI";
import PomodoroSettingsFeature from "../PomodoroSettingsFeature/PomodoroSettingsFeature";

function PomodoroFeature() {
   const [showSettings, setShowSettings] = useState(false);

   const handleSettingsModal = () => {
      setShowSettings((prev) => !prev);
   };

   return (
      <>
         <PomodoroSettingsFeature
            showSettings={showSettings}
            handleSettingsModal={handleSettingsModal}
         />
         <PomodoroCircleUI handleSettingsModal={handleSettingsModal} />
      </>
   );
}

export default PomodoroFeature;
