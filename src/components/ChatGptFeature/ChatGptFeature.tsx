"use client";

import React, { useState } from "react";
import ChatModalFeature from "../ChatModalFeature/ChatModalFeature";
import ChatGptUI from "../ChatGptUI/ChatGptUI";
import { ModalOption } from "@/utils/types";

function ChatGptFeature() {
   const [isComplexityModal, setIsComplexityModal] = useState<boolean>(false);
   const [isBugModal, setIsBugModal] = useState<boolean>(false);
   const [isExplainModal, setIsExplainModal] = useState<boolean>(false);

   const handleModal = (option: ModalOption) => {
      if (option === "complexity") {
         setIsComplexityModal(true);
      } else if (option === "bug") {
         setIsBugModal(true);
      } else if (option === "explain") {
         setIsExplainModal(true);
      } else {
         setIsComplexityModal(false);
         setIsBugModal(false);
         setIsExplainModal(false);
      }
   };

   return (
      <>
         <ChatModalFeature
            handleModal={handleModal}
            selectedModal='complexity'
            isModalOpen={isComplexityModal}
         />
         <ChatModalFeature handleModal={handleModal} selectedModal='bug' isModalOpen={isBugModal} />
         <ChatModalFeature
            handleModal={handleModal}
            selectedModal='explain'
            isModalOpen={isExplainModal}
         />

         <ChatGptUI handleModal={handleModal} />
      </>
   );
}

export default ChatGptFeature;
